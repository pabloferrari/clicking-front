
import ShiftService from '../../services/shifts'

const state = {
  shift: {},
  shifts: [],
  activePrompt: false
}


const getters = {
  getShift: state => { return state.shift },
  getShifts: state => { return state.shifts },
  getShiftId: state => id => {
    return state.shifts.find(
      shifts => shifts.id === id
    )
  }
}


const mutations = {
  updatedShift (state, shift) {
    state.shift = shift
  },

  setShifts (state, shifts) {
    state.shifts = shifts
  },

  setShift (state, shift) {
    state.shift = shift
  }

}

const actions = {
  createShift ({commit, state, dispatch}, shift) {
    ShiftService.create(shift).then((response) => {
      const shifts = Object.assign([], state.shifts)
      shifts.push(response.data)
      commit('setShifts', shifts)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },
  async updateShift ({ state, commit, dispatch }, shift) {
    try {
      const shiftEdit = await ShiftService.update(shift.id, shift)
      const newValue = state.shifts.map((value) => {
        if (value.id === shiftEdit.data.id) {
          value = Object.assign({}, shiftEdit.data)
        }
        return value
      })
      commit('setShifts', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteShift ({ state, commit, dispatch }, id) {
    try {
      await ShiftService.delete(id)
      const index = state.shifts.findIndex(x => x.id === id)
      const shifts =  [... state.shifts]
      shifts.splice(index, 1)
      commit('setShifts', shifts)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getShifts ({commit}) {
    try {
      const shiftsData = await ShiftService.getAll()
      commit('setShifts', shiftsData.data)
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

