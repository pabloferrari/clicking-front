
import assignmentGroupService from '../../services/assignmentGroup'

const state = {
  assignmentGroup: {},
  assignmentGroups: [],
  assignmentGroupsSelected: []
}

const getters = {
  getassignmentGroup: state => { return state.assignmentGroup },
  getAssignmentGroups: state => { return state.assignmentGroups },
  getAssignmentGroupsSelected: state => { return state.assignmentGroupsSelected },
  getAssignmentGroupId: state => id => {
    return state.assignmentGroups.find(
      assignmentGroups => assignmentGroups.id === id
    )
  }
}

const mutations = {
  updatedAssignmentGroups (state, assignmentGroups) {
    state.assignmentGroups = assignmentGroups
  },

  setAssignmentGroupsSelected (state, assignmentGroupsSelected) {
    state.assignmentGroupsSelected  = assignmentGroupsSelected
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
    try {
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
  },
  getAssignmentGroupByAssignment ({commit}, id) {
    return new Promise((resolve, reject) => {
      assignmentGroupService.getByAssignment(id).then((response) => {
        resolve(response.data)
        // const dataNew = Object.assign({},response.data)
        // commit('setAssignmentGroupsSelected', dataNew)
      }).catch((errr) => reject(errr))
    })
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

