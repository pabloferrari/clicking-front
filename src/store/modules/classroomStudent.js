
import ClassroomStudentService from '../../services/classroomStudent'

const state = {
  classroomstudent: {},
  classroomstudents: []
}


const getters = {
  getClassroomStudent: state => { return state.classroomstudent },
  getClassroomStudents: state => { return state.classroomstudents },
  getClassroomStudenId: state => id => {
    return state.classroomstudents.find(
        classroomstudents => classroomstudents.id === id
    )
  }
}


const mutations = {
  updatedClassroomStudents (state, classroomstudent) {
    state.classroomstudent = classroomstudent
  },

  setClassroomStudents (state, classroomstudents) {
    state.classroomstudents = classroomstudents
  },

  setClassroomStudent (state, classroomstudent) {
    state.classroomstudent = classroomstudent
  }

}

const actions = {
  async createClassroomStudent ({commit, state, dispatch}, classroomstudent) {

    // try {
    //   const newCommission = {
    //     name: commission.name,
    //     turn_id: commission.turn_id,
    //     institution_year_id: commission.institution_year_id
    //   }
    //   const commissionCreate  = await CommissionService.create(newCommission)
    //   const commissions = Object.assign([], state.commissions)

    //   commissions.push(commissionCreate.data)

    //   commit('setCommissions', commissions)

    //   dispatch(
    //     'notification/success',
    //     {title: 'Guardado exitoso....',
    //       text: 'se ha actualizado correctamente.'},
    //     { root: true }
    //   )
    // } catch (error) {
    //   console.log(error)
    // }
  },

  async updateClassroomStudent ({ state, commit, dispatch }, classroomstudent) {
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
  async deleteClassroomStudent ({ state, commit, dispatch }, id) {
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
  async getClassroomStudentsData ({commit}) {
    try {
      const classroomStudentData = await ClassroomStudentService.getAll()
      commit('setClassroomStudents', classroomStudentData.data)
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

