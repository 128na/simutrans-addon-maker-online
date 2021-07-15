import { createStore } from 'vuex'

import firebase from "firebase";
import app from "../firebase";
import persister from "../firebase/persister";

const SET_USER = 'SET_USER';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_SNIPPETS = 'SET_SNIPPETS';
const SET_UNSUBSCRIBES = 'SET_UNSUBSCRIBES';

export default createStore({
  state: {
    // https://firebase.google.com/docs/reference/js/firebase.User
    user: undefined,
    unsubscribes: [],
    projects: undefined,
    snippets: undefined,
  },
  getters: {
    isInitialized: state => state.user !== undefined,
    isLoggedIn: state => !!state.user,
    userName: state => state.user.displayName || 'Guest',
    userId: state => state.user.uid,

    projects: state => state.projects.filter(i => !i.data.deletedAt),
    projectLoaded: state => state.projects !== undefined,
    getProject: (state) => (id) => state.projects.find(i => i.id === id),
    existsProject: (state) => (id) => !!state.projects.find(i => i.id === id),
    trashedProjects: state => state.projects.filter(i => i.data.deletedAt),

    snippets: state => state.snippets.filter(i => !i.data.deletedAt),
    snippetLoaded: state => state.snippets !== undefined,
    getSnippet: (state) => (id) => state.snippets.find(i => i.id === id),
    existsSnippet: (state) => (id) => !!state.snippets.find(i => i.id === id),
    trashedSnippets: state => state.snippets.filter(i => i.data.deletedAt),

  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
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
      try {
        // 認証永続化
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const result = provider
          ? await firebase.auth().signInWithPopup(new app.authProviders[provider])
          : await firebase.auth().signInAnonymously();

        const user = result.user;
        context.commit(SET_USER, user);
      } catch (e) {
        console.error(e);
        alert('ログインに失敗しました');
      }
    },
    async link(context, provider) {
      try {
        await firebase.auth().currentUser.linkWithPopup(new app.authProviders[provider]);
        alert('連携しました');
      } catch (e) {
        console.error(e);
        alert('連携に失敗しました');
      }
    },
    async unlink(context, provider) {
      try {
        await firebase.auth().currentUser.unlink(app.authProviders[provider].PROVIDER_ID);
        alert('連携解除しました');
      } catch (e) {
        console.error(e);
        alert('連携解除に失敗しました');
      }
    },
    async signout(context) {
      try {
        await firebase.auth().signOut();
        context.dispatch('unsubscribeAll');
        context.commit(SET_USER, null);
        context.commit(SET_PROJECTS, []);
      } catch (e) {
        console.error(e);
        alert('ログアウトに失敗しました');
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
            onLoggedIn && onLoggedIn();
          } else {
            context.commit(SET_USER, null);
            onLoggedOut && onLoggedOut();
          }
        });
      } catch (e) {
        console.error(e);
        alert('無念！認証ステートチェックに失敗しました');
      }
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
      const unsubscribe = persister.project.listen(context.getters.userId, (projects) => {
        console.log({ projects });
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
      const unsubscribe = persister.snippet.listen(context.getters.userId, (snippets) => {
        console.log({ snippets });
        context.commit(SET_SNIPPETS, snippets);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


  },
  modules: {
  }
})