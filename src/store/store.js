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
import turn from './modules/turn'
import commission from './modules/commission'
import city from './modules/city'
import plan from './modules/plan'
import teacher from './modules/teacher'
import admin from './modules/admin'
import student from './modules/student'
import province from './modules/province'
import classroomStudent from './modules/classroomStudent'
import classroom from './modules/classroom'
import course from './modules/course'
import courseClass from './modules/courseClass'
import shift from './modules/shift'
import subject from './modules/subject'
import courseType from './modules/courseType'
import bigBlueButton from './modules/bigBlueButton'

import assignment from './modules/assignment'
import assignmentGroup from './modules/assignmentGroup'
import news from './modules/news'
import comment from './modules/comment'
import library from './modules/library'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    city,
    country,
    institution,
    turn,
    commission,
    teacher,
    admin,
    student,
    notification,
    plan,
    province,
    classroom,
    classroomStudent,
    course,
    courseClass,
    shift,
    subject,
    courseType,
    bigBlueButton,
    assignment,
    assignmentGroup,
    news,
    comment,
    library
  },
  getters,
  mutations,
  state,
  actions,
  strict: process.env.NODE_ENV !== 'production'
})
