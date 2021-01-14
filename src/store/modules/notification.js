
import NotificationService from '../../services/notifications'

const state = {
  notificationConfig: {
    title: '',
    text: '',
    color: '',
    iconPack: 'feather',
    icon: '',
    position: 'top-right',
    time: 4000
  },
  notifications: [],
  notificationCk: {},
  notificationsCk: [],
  notification: {}
}

const getters = {
  getNotifications: state => {
    return state.notifications
  },
  getNotification: state => {
    return state.notification
  },
  getNotificationsCk: state => {
    return state.notificationsCk
  },
  getNotificationCk: state => {
    return state.notificationCk
  }
}

const mutations = {
  setNotification (state, notification) {
    state.notification = notification
  },
  setNotifications (state, notifications) {
    state.notifications = notifications
  },
  setNotificationCk (state, notification) {
    state.notificationCk = notification
  },
  setNotificationsCk (state, notifications) {
    state.notificationsCk = notifications
  },
  deleteNotification (state) {
    // state.notifications = []
  }
}

// const actions = {
//   notify ({state}, {title, text, color, icon}) {
//     const notification = Object.assign({}, state.notificationConfig)
//     notification.title = title
//     notification.text = text
//     notification.color = color
//     notification.icon = icon
//     return notification
//   },
//   success ({ commit, dispatch }, {title, text}) {
//     dispatch('notification/notify', {
//       title, text, color: 'success', icon: 'icon-check-circle'
//     }, { root: true })
//       .then((value) => {
//         commit('setNotifications', value)
//       })
//   },
//   warning ({ commit, dispatch }, {title, text}) {
//     dispatch('notification/notify', {
//       title, text, color: 'warning', icon: 'icon-alert-triangle'
//     }, { root: true })
//       .then((value) => {
//         commit('setNotifications', value)
//       })
//   },
//   danger ({ commit, dispatch }, {title, text}) {
//     dispatch('notification/notify', {
//       title, text, color: 'danger', icon: 'icon-alert-circle'
//     }, { root: true })
//       .then((value) => {
//         commit('setNotifications', value)
//       })
//   }
// }

const actions = {
  async getNotifications ({commit}) {
    try {
      const notificationsData = await NotificationService.getAll()
      commit('setNotificationsCk', notificationsData.data)
    } catch (error) {
      console.log(error)
    }
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
