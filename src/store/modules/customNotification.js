
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
    state.notifications = notifications
  },
  deleteNotification (state) {
    // state.notifications = []
  }
}

const actions = {
  async getNotifications ({commit}) {
    try {
      const notificationsData = await NotificationService.getAll()
      commit('setNotifications', notificationsData.data)
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
