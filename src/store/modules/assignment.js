
import AssignmentService from '../../services/assignment'
import CourseClassService from '../../services/courseClass'
const state = {
  assignment: {},
  assignments: [],
  myAssignments: []
}


const getters = {
  getAssignment: state => { return state.assignment },
  getAssignments: state => { return state.assignments },
  getMyAssignments: state => { return state.myAssignments },
  getAssignmentsId: state => id => {
    return state.assignments.find(
      assignments => assignments.id === id
    )
  }
}


const mutations = {
  setAssignments (state, assignments) {
    state.assignments = assignments
  },
  setAssignment (state, assignment) {
    state.assignment = assignment
  },
  updatedAssignment (state, assignment) {
    const assignmentClone = Object.assign([], state.assignments)
    const newAssignment = assignmentClone.map((e) => {
      if (e.id === assignment.classId) {
        e.assignments.push(assignment)
      }
      return e
    })
    state.assignments = newAssignment
  },
  setMyAssignments (state, myAssignments) {
    state.myAssignments = myAssignments
  }
}

const actions = {
  async createAssignment ({ commit, dispatch }, assignment) {
    const newAssignment = {
      title: assignment.titleTask,
      description: assignment.description,
      class_id: assignment.class_id,
      limit_date: assignment.limit_date,
      assignment_type_id: assignment.id,
      assignment_status_id: 1,
      score: assignment.score,
      groupqty: assignment.groupqty,
      student_assignments: assignment.classroom_students
    }

    Object.keys(newAssignment).forEach(key => newAssignment[key] === undefined && delete newAssignment[key])
    await AssignmentService.create(newAssignment)
      .then((response) => {

        const assignmentData = {
          classId: response.data.class.id,
          title: response.data.title,
          id: response.data.id,
          groupqty: response.data.groupqty,
          description: response.data.description,
          limit_date: response.data.limit_date,
          assignmenttype: response.data.assignment_type
        }
        commit('updatedAssignment', assignmentData)

        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true }
        )
      }).catch((err) => console.log(err))
  },

  async createCourseClass ({ commit, state, dispatch }, courseClass) {
    await CourseClassService.create(courseClass)
      .then((response) => {
        const assignments = Object.assign([], state.assignments)
        assignments.push(response.data)
        commit('setAssignments', response.data)
        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true }
        )
      }).catch((err) => console.log(err))

  },

  async getAssignmentsByCourseData ({ commit }, id) {
    await AssignmentService.getAssignmentsByCourse(id)
      .then((response) => {
        commit('setAssignments', response.data)
      }).catch((err) => console.log(err))
  },
  async getAssignmentsById ({ commit }, id) {
    await AssignmentService.get(id)
      .then((response) => {
        commit('setAssignment', response.data)
      }).catch((err) => console.log(err))
  },
  async getMyAssignmentsData ({ commit }, id) {
    await AssignmentService.getMyAssignments(id)
      .then((response) => {
        commit('setMyAssignments', response.data)
      }).catch((err) => console.log(err))
  }

}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

