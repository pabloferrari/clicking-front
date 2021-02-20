import router from '../../router'

import authService from '../../services/authServices'

const state = {
  accessToken: '',
  expires_at: '',
  authUser: {},
  authLoading: false
}

const getters = {
  getUserAuth: state => {
    return state.authUser
  },
  getUserRoles: state => {
    return state.authUser.roles.map((x) => {
      return x.slug
    })
  },
  getAccessToken: state => {
    return state.AccessToken
  },
  getAuthLoading: state => {
    return state.authLoading
  }
}

const mutations = {
  setAuthUser (state, authUser) {
    state.authUser = authUser
  },
  setAccessToken (state, accessToken) {
    state.accessToken = accessToken
  },
  setAuthLoading (state, authLoading) {
    state.authLoading = authLoading
  }
}

const actions = {
  async login ({ commit }, credentials) {
    try {
      console.log(`login -> ${JSON.stringify(credentials)}`);
      commit('setAuthLoading', true)
      const auth = await authService.login(credentials)
      localStorage.setItem('userAuth', JSON.stringify(auth.data.user))
      localStorage.setItem('token', auth.data.access_token)
      commit('setAuthUser', auth.data.user)
      commit('setAuthLoading', false)
      router.push('/')
    } catch (error) {
      commit('setAuthLoading', false)
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
