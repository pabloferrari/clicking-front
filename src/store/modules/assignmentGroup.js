
import assignmentGroupService from '../../services/assignmentGroup'

const state = {
  assignmentGroup: {},
  assignmentGroups: []
}


const getters = {
  getassignmentGroup: state => { return state.assignmentGroup },
  getAssignmentGroups: state => { return state.assignmentGroups },
  getAssignmentGroupId: state => id => {
    return state.assignmentGroups.find(
      assignmentGroups => assignmentGroups.id === id
    )
  }
}


const mutations = {
  updatedAssignmentGroups (state, assignmentGroup) {
    state.assignmentGroup = assignmentGroup
  },

  setAssignmentGroups (state, assignmentGroups) {
    state.assignmentGroups = assignmentGroups
  },

  setAssignmentGroup (state, assignmentGroup) {
    state.assignmentGroup = assignmentGroup
  }

}

const actions = {
  async createAssignmentGroup ({commit, state, dispatch}, assignmentGroup) {

    //  CourseTypeService.create(courseType).then((response) => {
    //   const courseTypes = Object.assign([], state.courseTypes)
    //   courseTypes.push(response.data)
    //   commit('setCourseTypes', courseTypes)
    //   dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    // }).catch((err) => {
    //   console.log(err)
    // })

    try {
      // const newAssignmentGroup = {
      //   name: assignmentGroup.name,
      //   institution_id: assignmentGroup.institution_id,
      //   shift_id: assignmentGroup.shift_id,
      //   courses: assignmentGroup.courses,
      //   student_id: assignmentGroup.student_id
      // }
      //console.log(newassignmentGroup)
      await assignmentGroupService.create(assignmentGroup)
      const assignmentGroups = Object.assign([], state.assignmentGroups)

      assignmentGroups.push(assignmentGroupService.data)
      commit('setAssignmentGroups', assignmentGroups)

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

  //async updateClassroom ({ state, commit, dispatch }, classroomstudent) {
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
  //},
  //async deleteClassroom ({ state, commit, dispatch }, id) {
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
  //},
  async getAssignmentGroupsData ({commit}) {
    try {
      const assignmentGroupData = await assignmentGroupService.getAll()
      commit('setAssignmentGroups', assignmentGroupData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getAssignmentGroupCount ({commit}, id) {
    try {
      const assignmentGroupData = await assignmentGroupService.getAssignmentGroupCount(id)
      commit('setAssignmentGroup', assignmentGroupData.data)
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

