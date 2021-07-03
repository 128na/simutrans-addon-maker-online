import { createStore } from 'vuex'

import firebase from "firebase";
import dataManager from "../firebase/dataManager";
const provider = new firebase.auth.GoogleAuthProvider();

const SET_USER = 'SET_USER';
const SET_PROJECTS = 'SET_PROJECTS';
export default createStore({
  state: {
    // https://firebase.google.com/docs/reference/js/firebase.User
    user: undefined,
    projects: [],
  },
  getters: {
    isInitialized: state => state.user !== undefined,
    isLoggedIn: state => !!state.user,
    userName: state => state.user.displayName,
    userId: state => state.user.uid,
    projects: state => state.projects,
  },
  mutations: {
    [SET_USER](state, user) {
      console.log({ user });
      state.user = user;
    },
    [SET_PROJECTS](state, projects) {
      console.log({ projects });
      state.projects = projects;
    }
  },
  actions: {
    async login(context) {
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
    async logout(context) {
      try {
        await firebase.auth().signOut();
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
            context.dispatch('fetchProjects');
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

    async fetchProjects(context) {
      const projects = await dataManager.project.fetchAll(userId);
      context.commit(SET_PROJECTS, projects);
    },
    async createProject(context, projectData) {
      await dataManager.project.create(context.getters.userId, projectData);
      context.dispatch('fetchProjects');
    },
    async updateProject(context, project) {
      await dataManager.project.update(context.getters.userId, project);
      context.dispatch('fetchProjects');
    },
    async deleteProject(context, project) {
      await dataManager.project.delete(context.getters.userId, project);
      context.dispatch('fetchProjects');
    },

  },
  modules: {
  }
})
