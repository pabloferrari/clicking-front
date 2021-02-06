/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'
import baseRouter from './router/base.router'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
    // =============================================================================
    // MAIN LAYOUT ROUTES
    // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      meta: {
        requiresAuth: true
      },
      children: [...baseRouter]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '/pages',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      meta: {
        requiresAuth: false
      },
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/not-authorized',
          name: 'page-not-authorized',
          component: () => import('@/views/pages/NotAuthorized.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

function checkRoutePermissions (permission) {
  let exist = false
  const roles = store.getters['auth/getUserRoles']
  if (permission && permission instanceof Array) {
    if (permission.length > 0) {
      const permissionRoles = permission
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (hasPermission) {
        exist = true
      }
    }
  } else {
    throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"')
  }
  return exist
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('userAuth') || !localStorage.getItem('token')) {
      next('/pages/login')
    }
  }
  store.commit('auth/setAuthUser', JSON.parse(localStorage.getItem('userAuth')))
  store.commit('auth/setAccessToken', localStorage.getItem('token'))
  if (to.meta.permissions && to.meta.permissions.length > 0) {
    if (checkRoutePermissions(to.meta.permissions)) {
      next()
    } else {
      next('/pages/not-authorized')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
