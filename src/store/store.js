/*=========================================================================================
  File Name: store.js
  Description: Vuex store
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import auth from './modules/auth'
import notification from './modules/notification'

import country from './modules/country'
import institution from './modules/institution'
import city from './modules/city'
import plan from './modules/plan'
import teacher from './modules/teacher'
import student from './modules/student'
import province from './modules/province'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    city,
    country,
    institution,
    teacher,
    student,
    notification,
    plan,
    province
  },
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
