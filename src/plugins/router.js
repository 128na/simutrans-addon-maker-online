import { createRouter, createWebHistory } from 'vue-router';
import Projects from '../views/Projects.vue';
import Signin from '../views/Signin.vue';

const routes = [
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/',
    name: 'Projects',
    component: () => import(/* webpackChunkName: "project" */ '../views/Projects.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/projects/:id',
    name: 'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/snippets',
    name: 'Snippets',
    component: () => import(/* webpackChunkName: "snippet" */ '../views/Snippets.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/snippets/:id',
    name: 'Snippet',
    component: () => import(/* webpackChunkName: "snippet" */ '../views/Snippet.vue'),
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
});

import store from './store';
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isInitialized && !store.getters.isLoggedIn) {
      next({ name: 'Signin' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
