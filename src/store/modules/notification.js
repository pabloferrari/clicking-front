

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
  notification: {}
}

const getters = {
  getNotifications: state => {
    return state.notifications
  },
  getNotification: state => {
    return state.notification
  }
}

const mutations = {
  setNotification (state, notification) {
    state.notification = notification 
  },
  setNotifications (state, notifications) {
    state.notifications.push(notifications) 
  },
  deleteNotification (state) {
    state.notifications = []
  }
}

const actions = {
  notify ({state}, {title, text, color, icon}) {
    const notification = Object.assign({}, state.notificationConfig) 
    notification.title = title
    notification.text = text
    notification.color = color
    notification.icon = icon
    return notification
  },
  success ({ commit, dispatch }, {title, text}) {
    dispatch('notification/notify', { 
      title, text, color: 'success', icon: 'icon-check-circle'
    }, { root: true })
      .then((value) => {
        commit('setNotifications', value)
      })
  },
  warning ({ commit, dispatch }, {title, text}) {
    dispatch('notification/notify', {
      title, text, color: 'warning', icon: 'icon-alert-triangle'
    }, { root: true })
      .then((value) => {
        commit('setNotifications', value)
      })
  },
  danger ({ commit, dispatch }, {title, text}) {
    dispatch('notification/notify', {
      title, text, color: 'danger', icon: 'icon-alert-circle'
    }, { root: true })
      .then((value) => {
        commit('setNotifications', value)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}