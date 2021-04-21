import DashboardService from '../../services/dashboard'

const state = {
  resumen: []
}
const getters = {
  getResumen: state => { return state.resumen }
}

const mutations = {
  setResumen (state, resumen) {
    state.resumen = resumen
  }
}

const actions = {
  async getResumenDashboard ({commit}) {
    try {
      const data = await DashboardService.get()
      commit('setResumen', data.data)
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
