
import CourseTypeService from '../../services/courseTypes'

const state = {
  courseType: {},
  courseTypes: [],
  activePrompt: false
}


const getters = {
  getCourseType: state => { return state.courseType },
  getCourseTypes: state => { return state.courseTypes },
  getCourseTypeId: state => id => {
    return state.courseTypes.find(
      courseTypes => courseTypes.id === id
    )
  }
}


const mutations = {
  updatedCourseType (state, courseType) {
    state.courseType = courseType
  },

  setCourseTypes (state, courseTypes) {
    state.courseTypes = courseTypes
  },

  setCourseType (state, courseType) {
    state.courseType = courseType
  }

}

const actions = {
  createCourseType ({ commit, state, dispatch }, courseType) {
    CourseTypeService.create(courseType).then((response) => {
      const courseTypes = Object.assign([], state.courseTypes)
      courseTypes.push(response.data)
      commit('setCourseTypes', courseTypes)
      dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
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
  async getCourseTypesData ({ commit }) {
    try {
      const courseTypesData = await CourseTypeService.getAll()
      commit('setCourseTypes', courseTypesData.data)
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

