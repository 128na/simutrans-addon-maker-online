import { createStore } from 'vuex'

import firebase from "firebase";
import dataManager from "../firebase/dataManager";
const provider = new firebase.auth.GoogleAuthProvider();

const SET_USER = 'SET_USER';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_UNSUBSCRIBES = 'SET_UNSUBSCRIBES';
export default createStore({
  state: {
    // https://firebase.google.com/docs/reference/js/firebase.User
    user: undefined,
    projects: undefined,
    unsubscribes: [],
  },
  getters: {
    isInitialized: state => state.user !== undefined,
    isLoggedIn: state => !!state.user,
    userName: state => state.user.displayName,
    userId: state => state.user.uid,
    projects: state => state.projects.filter(p => !p.data.deletedAt),
    projectLoaded: state => state.projects !== undefined,
    getProject: (state) => (id) => state.projects.find(p => p.id === id),
    existsProject: (state) => (id) => !!state.projects.find(p => p.id === id),
    trashedProjects: state => state.projects.filter(p => p.data.deletedAt),
  },
  mutations: {
    [SET_USER](state, user) {
      state.user = user;
    },
    [SET_PROJECTS](state, projects) {
      state.projects = projects;
    },
    [SET_UNSUBSCRIBES](state, unsubscribes) {
      state.unsubscribes = unsubscribes;
    }
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
    async signin(context) {
      try {
        // 認証永続化
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        context.commit(SET_USER, user);
      } catch (e) {
        console.log(e);
        alert('ログインに失敗しました');
      }
    },
    async signout(context) {
      try {
        await firebase.auth().signOut();
        context.dispatch('unsubscribeAll');
        context.commit(SET_USER, null);
        context.commit(SET_PROJECTS, []);
      } catch (e) {
        console.log(e);
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
            onLoggedIn && onLoggedIn();
          } else {
            context.commit(SET_USER, null);
            onLoggedOut && onLoggedOut();
          }
        });
      } catch (e) {
        console.log(e);
        alert('無念！認証ステートチェックに失敗しました');
      }
    },

    // プロジェクト
    async createProject(context, projectData) {
      await dataManager.project.create(context.getters.userId, projectData);
    },
    async updateProject(context, project) {
      await dataManager.project.update(context.getters.userId, project);
    },
    async deleteProject(context, project) {
      await dataManager.project.delete(context.getters.userId, project);
    },
    async restoreProject(context, project) {
      await dataManager.project.restore(context.getters.userId, project);
    },
    async forceDeleteProject(context, project) {
      await dataManager.project.forceDelete(context.getters.userId, project);
    },
    watchProjectState(context) {
      const unsubscribe = dataManager.project.listen(context.getters.userId, (projects) => {
        context.commit(SET_PROJECTS, projects);
      });
      context.dispatch('addUnsubscribe', unsubscribe);
    },


  },
  modules: {
  }
})
