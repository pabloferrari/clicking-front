
import ClassroomService from '../../services/classroom'

const state = {
  classroom: {},
  classrooms: []
}


const getters = {
  getClassroom: state => { return state.classroom },
  getClassrooms: state => { return state.classrooms },
  getgetClassroomId: state => id => {
    return state.classrooms.find(
      classrooms => classrooms.id === id
    )
  }
}


const mutations = {
  updatedClassrooms (state, classroom) {
    state.classroom = classroom
  },

  setClassrooms (state, classrooms) {
    state.classrooms = classrooms
  },

  setClassroom (state, classroom) {
    state.classroom = classroom
  }

}

const actions = {
  async createClassroom ({commit, state, dispatch}, classroomstudent) {

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

  async updateClassroom ({ state, commit, dispatch }, classroomstudent) {
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
  async deleteClassroom ({ state, commit, dispatch }, id) {
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
  async getClassroomsData ({commit},id) {
    try {
      const classroomData = await ClassroomService.get(id)
      commit('setClassrooms', classroomData.data)
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

