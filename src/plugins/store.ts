// https://next.vuex.vuejs.org/ja/guide/typescript-support.html

import { createStore } from 'vuex'

import firebase from "firebase";
import { authProviders } from "@/firebase";
import persister from "@/firebase/persister";
import { signInWithPopup, linkWithPopup, unlinkWithPopup } from "@/services/ApiPortal";
import { State, Project, Snippet, FBFile } from './interface';
import filePersister from '@/firebase/filePersister';
import { handleFirebaseAuthError, handleFirebaseStorageError, handleFirestoreError } from '@/services/ErrorHandling';

const SET_MESSAGE = 'SET_MESSAGE';
const SET_USER = 'SET_USER';
const SET_CREDENTIAL = 'SET_CREDENTIAL';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_FILES = 'SET_FILES';
const SET_UNSUBSCRIBES = 'SET_UNSUBSCRIBES';

export default createStore<State>({
  state: {
    message: null,
    // https://firebase.google.com/docs/reference/js/firebase.User
    user: undefined,
    credential: null,
    unsubscribes: [],
    projects: undefined,
    snippets: undefined,
    files: undefined,
  },
  getters: {
    hasMessage: state => !!state.message,
    message: state => state.message,

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
    [SET_MESSAGE](state, message) {
      state.message = message;
    },
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_CREDENTIAL](state, credential) {
      console.log({ credential })
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

    clearMessage(context) {
      context.commit(SET_MESSAGE, null);
    },

    // 認証
    async signin(context, provider = null) {
      try {
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
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },
    async link(context, provider: string) {
      try {
        const uid: string | undefined = context.state.user?.uid;
        if (!uid) {
          throw Error('missing uid');
        }
        provider === 'portal'
          ? await linkWithPopup(uid)
          : await firebase.auth().currentUser?.linkWithPopup(new authProviders[provider]);
        alert('連携しました');
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },
    async unlink(context, provider: string) {
      try {
        provider === 'portal'
          ? await unlinkWithPopup()
          : await firebase.auth().currentUser?.unlink(authProviders[provider].PROVIDER_ID);
        alert('連携解除しました');
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },
    async signout(context) {
      try {
        await firebase.auth().signOut();
        context.dispatch('unsubscribeAll');
        context.commit(SET_USER, null);
        context.commit(SET_PROJECTS, []);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },

    // firebaseの認証状態変化に応じてステートを更新する
    watchAuthState(context, { onLoggedIn, onLoggedOut }) {
      try {
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
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },
    async deleteUser(context) {
      const user = firebase.auth().currentUser;
      if (!user) {
        return;
      }
      try {
        await user.delete();
        context.dispatch('unsubscribeAll');
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseAuthError(e));
      }
    },

    // プロジェクト
    async createProject(context, projectData) {
      try {
        await persister.project.create(context.getters.userId, projectData);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async updateProject(context, project) {
      try {
        await persister.project.update(context.getters.userId, project);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async deleteProject(context, project) {
      try {
        await persister.project.delete(context.getters.userId, project);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async restoreProject(context, project) {
      try {
        await persister.project.restore(context.getters.userId, project);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async forceDeleteProject(context, project) {
      try {
        await persister.project.forceDelete(context.getters.userId, project);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    watchProjectState(context) {
      const unsubscribe = persister.project.listen(context.getters.userId, (projects: Project[]) => {
        context.commit(SET_PROJECTS, projects);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


    // プロジェクト
    async createSnippet(context, snippetData) {
      try {
        await persister.snippet.create(context.getters.userId, snippetData);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async updateSnippet(context, snippet) {
      try {
        await persister.snippet.update(context.getters.userId, snippet);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async deleteSnippet(context, snippet) {
      try {
        await persister.snippet.delete(context.getters.userId, snippet);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async restoreSnippet(context, snippet) {
      try {
        await persister.snippet.restore(context.getters.userId, snippet);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    async forceDeleteSnippet(context, snippet) {
      try {
        await persister.snippet.forceDelete(context.getters.userId, snippet);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirestoreError(e));
      }
    },
    watchSnippetState(context) {
      const unsubscribe = persister.snippet.listen(context.getters.userId, (snippets: Snippet[]) => {
        context.commit(SET_SNIPPETS, snippets);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


    async fetchFiles(context) {
      try {
        const files = await filePersister.fetchAll(context.getters.userId);
        context.commit(SET_FILES, files);
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseStorageError(e));
      }
    },
    async uploadFiles(context, files: File[]) {
      try {
        await filePersister.upload(context.getters.userId, files);
        context.dispatch('fetchFiles');
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseStorageError(e));
      }
    },
    async deleteFile(context, filename: string) {
      try {
        await filePersister.delete(context.getters.userId, filename);
        context.dispatch('fetchFiles');
      } catch (e: any) {
        context.commit(SET_MESSAGE, handleFirebaseStorageError(e));
      }
    },


  },
  modules: {
  }
});
