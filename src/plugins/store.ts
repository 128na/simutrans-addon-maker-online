// https://next.vuex.vuejs.org/ja/guide/typescript-support.html

import filePersister from '@/firebase/filePersister';
import firebase from "firebase";
import persister from "@/firebase/persister";
import { State, Project, Snippet, FBFile } from './interface';
import { authProviders } from "@/firebase";
import { createStore } from 'vuex'
import { signInWithPopup, linkWithPopup, unlinkWithPopup } from "@/services/ApiPortal";

const SET_USER = 'SET_USER';
const SET_CREDENTIAL = 'SET_CREDENTIAL';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_FILES = 'SET_FILES';
const SET_UNSUBSCRIBES = 'SET_UNSUBSCRIBES';

export default createStore<State>({
  state: {
    // https://firebase.google.com/docs/reference/js/firebase.User
    user: undefined,
    credential: null,
    unsubscribes: [],
    projects: undefined,
    snippets: undefined,
    files: undefined,
  },
  getters: {
    isInitialized: state => state.user !== undefined,
    isLoggedIn: state => !!state.user,
    userName: state => state.user?.displayName || 'Guest',
    userId: state => state.user?.uid,
    hasCredential: state => !!state.credential,

    projects: state => state.projects?.filter(i => !i.data.deletedAt),
    projectLoaded: state => state.projects !== undefined,
    getProject: (state) => (id: string) => state.projects?.find(i => i.id === id),
    existsProject: (state) => (id: string) => !!state.projects?.find(i => i.id === id),
    trashedProjects: state => state.projects?.filter(i => i.data.deletedAt),
    getProjectsByFile: state => (file: FBFile) => state.projects?.filter(p => p.data.imageUrls.some(i => i.filename === file.filename)),
    existsProjectByFile: state => (file: FBFile) => state.projects?.some(p => p.data.imageUrls.some(i => i.filename === file.filename)),

    snippets: state => state.snippets?.filter(i => !i.data.deletedAt),
    snippetLoaded: state => state.snippets !== undefined,
    getSnippet: (state) => (id: string) => state.snippets?.find(i => i.id === id),
    existsSnippet: (state) => (id: string) => !!state.snippets?.find(i => i.id === id),
    trashedSnippets: state => state.snippets?.filter(i => i.data.deletedAt),

    files: state => state.files,
    fileLoaded: state => state.files !== undefined,
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_CREDENTIAL](state, credential) {
      state.credential = credential;
    },
    [SET_UNSUBSCRIBES](state, unsubscribes) {
      state.unsubscribes = unsubscribes;
    },
    [SET_PROJECTS](state, projects) {
      state.projects = projects;
    },
    [SET_SNIPPETS](state, snippets) {
      state.snippets = snippets;
    },
    [SET_FILES](state, files) {
      state.files = files;
    },
  },
  actions: {
    // リスナ追加
    addUnsubscribe(context, unsubscribe) {
      context.commit(SET_UNSUBSCRIBES, [...context.state.unsubscribes, unsubscribe]);
    },
    // リスナ全消し
    unsubscribeAll(context) {
      context.state.unsubscribes.map(unsubscribe => unsubscribe());
      context.commit(SET_UNSUBSCRIBES, []);
    },

    // 認証
    async signin(context, provider = null) {
      // 認証永続化
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      const result = provider === 'portal'
        ? await signInWithPopup()
        : (provider
          ? await firebase.auth().signInWithPopup(new authProviders[provider])
          : await firebase.auth().signInAnonymously()
        );

      context.commit(SET_USER, result.user);
      context.commit(SET_CREDENTIAL, result.credential);
    },
    async link(context, provider: string) {
      const uid: string | undefined = context.state.user?.uid;
      if (!uid) {
        throw Error('missing uid');
      }
      provider === 'portal'
        ? await linkWithPopup(uid)
        : await firebase.auth().currentUser?.linkWithPopup(new authProviders[provider]);
    },
    async unlink(context, provider: string) {
      provider === 'portal'
        ? await unlinkWithPopup()
        : await firebase.auth().currentUser?.unlink(authProviders[provider].PROVIDER_ID);
    },
    async signout(context) {
      await firebase.auth().signOut();
      context.dispatch('unsubscribeAll');
      context.commit(SET_USER, null);
      context.commit(SET_PROJECTS, []);
    },

    // firebaseの認証状態変化に応じてステートを更新する
    watchAuthState(context, { onLoggedIn, onLoggedOut }) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          context.commit(SET_USER, user);
          context.dispatch('watchProjectState');
          context.dispatch('watchSnippetState');
          context.dispatch('fetchFiles');
          onLoggedIn && onLoggedIn();
        } else {
          context.commit(SET_USER, null);
          context.commit(SET_CREDENTIAL, null);
          onLoggedOut && onLoggedOut();
        }
      });
    },
    async deleteUser(context) {
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      await user.delete();
      context.dispatch('unsubscribeAll');
    },

    // プロジェクト
    async createProject(context, projectData) {
      await persister.project.create(context.getters.userId, projectData);
    },
    async updateProject(context, project) {
      await persister.project.update(context.getters.userId, project);
    },
    async deleteProject(context, project) {
      await persister.project.delete(context.getters.userId, project);
    },
    async restoreProject(context, project) {
      await persister.project.restore(context.getters.userId, project);
    },
    async forceDeleteProject(context, project) {
      await persister.project.forceDelete(context.getters.userId, project);
    },
    watchProjectState(context) {
      const unsubscribe = persister.project.listen(context.getters.userId, (projects: Project[]) => {
        context.commit(SET_PROJECTS, projects);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


    // プロジェクト
    async createSnippet(context, snippetData) {
      await persister.snippet.create(context.getters.userId, snippetData);
    },
    async updateSnippet(context, snippet) {
      await persister.snippet.update(context.getters.userId, snippet);
    },
    async deleteSnippet(context, snippet) {
      await persister.snippet.delete(context.getters.userId, snippet);
    },
    async restoreSnippet(context, snippet) {
      await persister.snippet.restore(context.getters.userId, snippet);
    },
    async forceDeleteSnippet(context, snippet) {
      await persister.snippet.forceDelete(context.getters.userId, snippet);
    },
    watchSnippetState(context) {
      const unsubscribe = persister.snippet.listen(context.getters.userId, (snippets: Snippet[]) => {
        context.commit(SET_SNIPPETS, snippets);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


    async fetchFiles(context) {
      const files = await filePersister.fetchAll(context.getters.userId);
      context.commit(SET_FILES, files);
    },
    async uploadFiles(context, files: File[]) {
      await filePersister.upload(context.getters.userId, files);
      context.dispatch('fetchFiles');
    },
    async deleteFile(context, filename: string) {
      await filePersister.delete(context.getters.userId, filename);
      context.dispatch('fetchFiles');
    },


  },
  modules: {
  }
});
