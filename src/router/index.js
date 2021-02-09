import Vue from 'vue'

import store from '../store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Login',
    component: resolve => require(['@/views/auth/Login'], resolve)
  },
  {
    path: '/',
    name: 'Login',
    component: resolve => require(['@/views/auth/Login'], resolve)
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: resolve => require(['@/views/Dashboard'], resolve),
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/' && store.getters.getAuthenticationToken) {
    return next('/dashboard')
  }
  if (to.meta.requireAuth) {
    if (store.getters.getAuthenticationToken) {
      next()
    } else {
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
