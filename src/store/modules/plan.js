
import PlansService from '../../services/plans'

const state = {
  plan: {},
  plans: [],
  activePrompt: false
}


const getters = {
  getPlan: state => { return state.plan },
  getPlans: state => { return state.plans },
  getPlanId: state => id => {
    return state.plans.find(
      plans => plans.id === id 
    )
  }
}


const mutations = {
  updatedPlan (state, plan) {
    state.plan = plan
  },

  setPlans (state, plans) {
    state.plans = plans
  },

  setPlan (state, plan) {
    state.plan = plan
  }

}

const actions = {
  createPlan ({commit, state, dispatch}, plan) {
    PlansService.create(plan).then((response) => {
      const plans = Object.assign([], state.plans)
      plans.push(response.data)
      commit('setplans', plans)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },

  async updatePlan ({ state, commit, dispatch }, plan) {
    try {
      const planEdit = await PlansService.update(plan.id, plan)
      const newValue = state.plans.map((value) => {
        if (value.id === planEdit.data.id) {
          value = Object.assign({}, planEdit.data)
        }
        return value
      })
      commit('setPlans', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deletePlan ({ state, commit, dispatch }, id) {
    try {
      await PlansService.delete(id)
      const index = state.plans.findIndex(x => x.id === id)
      const plans =  [... state.plans]
      plans.splice(index, 1)
      commit('setPlans', plans)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getPlans ({commit}) {
    try {
      const plansData = await PlansService.getAll() 
      commit('setPlans', plansData.data.data)
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

