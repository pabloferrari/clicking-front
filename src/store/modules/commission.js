
import CommissionService from '../../services/commission'

const state = {
  commission: {},
  commissions: []
}


const getters = {
  getCommission: state => { return state.commission },
  getCommissions: state => { return state.commissions },
  getCommissionId: state => id => {
    return state.commissions.find(
      commissions => commissions.id === id
    )
  }
}


const mutations = {
  updatedCommissions (state, commission) {
    state.commission = commission
  },

  setCommissions (state, commissions) {
    state.commissions = commissions
  },

  setCommission (state, commission) {
    state.commission = commission
  }

}

const actions = {
  async createCommission ({commit, state, dispatch}, commission) {

    try {
      const newCommission = {
        name: commission.name,
        turn_id: commission.turn_id,
        institution_year_id: commission.institution_year_id
      }
      const commissionCreate  = await CommissionService.create(newCommission)
      const commissions = Object.assign([], state.commissions)

      commissions.push(commissionCreate.data)

      commit('setCommissions', commissions)

      dispatch(
        'notification/success',
        {title: 'Guardado exitoso....',
          text: 'se ha actualizado correctamente.'},
        { root: true }
      )
    } catch (error) {
      console.log(error)
    }
  },

  async updateCommission ({ state, commit, dispatch }, commission) {
    try {
      const editCommission = {

        name: commission.name,
        turn_id: commission.turn_id,
        institution_year_id: commission.institution_year_id
      }
      const commissionEdit = await CommissionService.update(commission.id, editCommission)

      const newValue = state.commissions.map((value) => {
        if (value.id === commissionEdit.data.id) {
          value = Object.assign({}, commissionEdit.data)
        }
        return value
      })
      commit('setCommissions', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteCommission ({ state, commit, dispatch }, id) {
    try {
      await CommissionService.delete(id)
      const index = state.commissions.findIndex(x => x.id === id)
      const commission =  [... state.commissions]
      commission.splice(index, 1)
      commit('setCommissions', commission)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getCommissions ({commit}) {
    try {
      const commissionData = await CommissionService.getAll()
      commit('setCommissions', commissionData.data)
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

