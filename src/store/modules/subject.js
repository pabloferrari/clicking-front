
import SubjectService from '../../services/subjects'

const state = {
  subject: {},
  subjects: [],
  activePrompt: false
}


const getters = {
  getSubject: state => { return state.subject },
  getSubjects: state => { return state.subjects },
  getSubjectId: state => id => {
    return state.subjects.find(
      subjects => subjects.id === id
    )
  }
}


const mutations = {
  updatedSubject (state, subject) {
    state.subject = subject
  },

  setSubjects (state, subjects) {
    state.subjects = subjects
  },

  setSubject (state, subject) {
    state.subject = subject
  }

}

const actions = {
  createSubject ({commit, state, dispatch}, subject) {
    SubjectService.create(subject).then((response) => {
      const subjects = Object.assign([], state.subjects)
      subjects.push(response.data)
      commit('setSubjects', subject)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },
  // async updateShift ({ state, commit, dispatch }, shift) {
  //   try {
  //     const shiftEdit = await ShiftService.update(shift.id, shift)
  //     const newValue = state.shifts.map((value) => {
  //       if (value.id === shiftEdit.data.id) {
  //         value = Object.assign({}, shiftEdit.data)
  //       }
  //       return value
  //     })
  //     commit('setShifts', newValue)
  //     dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  // async deleteCountry ({ state, commit, dispatch }, id) {
  //   try {
  //     await CountryService.delete(id)
  //     const index = state.countries.findIndex(x => x.id === id)
  //     const countries =  [... state.countries]
  //     countries.splice(index, 1)
  //     commit('setCountries', countries)
  //     dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  async getSubjects ({commit}) {
    try {
      const subjectsData = await SubjectService.getAll()
      commit('setSubjects', subjectsData.data)
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

