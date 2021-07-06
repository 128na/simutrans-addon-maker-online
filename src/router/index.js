import { createRouter, createWebHistory } from 'vue-router'
import Projects from '../views/Projects.vue'
import Signin from '../views/Signin.vue'

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
    meta: { requiresAuth: true }
  },
  {
    path: '/project/:id',
    name: 'Project',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
})

import store from '../store';
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ name: 'Signin' })
    } else {
      next()
    }
  } else {
    next()
  }
});

export default router
