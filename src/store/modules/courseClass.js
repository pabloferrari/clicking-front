
import CourseClassService from '../../services/courseClass'

const state = {
  courseClass: {},
  courseClasses: []
}


const getters = {
  getCourseClass: state => { return state.courseClass },
  getCourseClasses: state => { return state.courseClasses },
  getCourseClassId: state => id => {
    return state.courseClasses.find(
      courseClasses => courseClasses.id === id
    )
  }
}


const mutations = {
  updatedCourseClasses (state, courseClass) {
    state.courseClass = courseClass
  },

  setCourseClasses (state, courseClasses) {
    state.courseClasses = courseClasses
  },

  setCourseClass (state, courseClass) {
    state.courseClass = courseClass
  }

}

const actions = {
  async createCourseClass ({commit, state, dispatch}, courseClass) {
    try {
    //.then((response) => {
      const courseClasseCreate  = await CourseClassService.create(courseClass)
      const courseClasses = Object.assign([], state.courseClasses)
      //plans.push(response.data)

      try {
        const courseClassData = await CourseClassService.get(courseClass.course_id)
        commit('setCourseClasses', courseClassData.data)
      } catch (error) {
        console.log(error)
      }

      dispatch(
        'notification/success',
        {
          title: 'Guardado exitoso....',
          text: 'se ha actualizado correctamente.'
        },
        { root: true }
      )
    } catch (error) {
      console.log(error)
    }
  },

  async updateCourseClass ({ state, commit, dispatch }, courseClass) {
    // try {
    //   const editCommission = {

    //     name: commission.name,
    //     turn_id: commission.turn_id,
    //     institution_year_id: commission.institution_year_id
    //   }
    //   const commissionEdit = await CommissionService.update(commission.id, editCommission)

    //   const newValue = state.commissions.map((value) => {
    //     if (value.id === commissionEdit.data.id) {
    //       value = Object.assign({}, commissionEdit.data)
    //     }
    //     return value
    //   })
    //   commit('setCommissions', newValue)
    //   dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    // } catch (error) {
    //   console.log(error)
    // }
  },
  async deleteCourseClass ({ state, commit, dispatch }, id) {
    // try {
    //   await CommissionService.delete(id)
    //   const index = state.commissions.findIndex(x => x.id === id)
    //   const commission =  [... state.commissions]
    //   commission.splice(index, 1)
    //   commit('setCommissions', commission)
    //   dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    // } catch (error) {
    //   console.log(error)
    // }
  },
  async getCourseClassesSubjectData ({commit},id) {
    try {
      const courseClassData = await CourseClassService.get(id)
      commit('setCourseClasses', courseClassData.data)
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

