
import AssignmentService from '../../services/assignment'
import CourseClassService from '../../services/courseClass'
const state = {
  assignment: {},
  assignments: [],
  myAssignments: [],
  assignmentDetail: []
}


const getters = {
  getAssignment: state => { return state.assignment },
  getAssignments: state => { return state.assignments },
  getMyAssignments: state => { return state.myAssignments },
  getAssignmentDetail: state => { return state.assignmentDetail },
  getAssignmentsId: state => id => {
    return state.assignments.find(
      assignments => assignments.id === id
    )
  }
}


const mutations = {
  setAssignments(state, assignments) {
    state.assignments = assignments
  },
  setAssignment(state, assignment) {
    state.assignment = assignment
  },
  updatedAssignment(state, assignment) {
    const assignmentClone = Object.assign([], state.assignments)
    const newAssignment = assignmentClone.map((e) => {
      if (e.id === assignment.classId) {
        e.assignments.push(assignment)
      }
      return e
    })
    state.assignments = newAssignment
  },
  setMyAssignments(state, myAssignments) {
    state.myAssignments = myAssignments
  },
  setAssignmentDetail(state, assignmentDetail) {
    state.assignmentDetail = assignmentDetail
  }
}

const actions = {
  async createAssignment({ commit, dispatch }, assignment) {
    const newAssignment = {
      title: assignment.titleTask,
      description: assignment.description,
      class_id: assignment.class_id,
      limit_date: assignment.limit_date,
      assignment_type_id: assignment.id,
      assignment_status_id: 1,
      score: assignment.score ? assignment.score : 0,
      groupqty: assignment.groupqty ? assignment.groupqty : 0,
      student_assignments: assignment.classroom_students,
      file: assignment.file
    }

    Object.keys(newAssignment).forEach(key => newAssignment[key] === undefined && delete newAssignment[key])

    const formData = new FormData()
    formData.append('title', newAssignment.title)
    formData.append('description', newAssignment.description)
    formData.append('class_id', newAssignment.class_id)
    formData.append('limit_date', newAssignment.limit_date)
    formData.append('assignment_type_id', newAssignment.assignment_type_id)
    formData.append('assignment_status_id', newAssignment.assignment_status_id)
    formData.append('score', newAssignment.score)
    formData.append('groupqty', newAssignment.groupqty)

    for (let i = 0; i < newAssignment.file.length; i++) {
      const file = newAssignment.file[i]
      formData.append(`files[${i}]`, file)
    }
    //formData.append('file', newAssignment.file)

    for (let i = 0; i < newAssignment.student_assignments.length; i++) {
      formData.append('student_assignments[]', newAssignment.student_assignments[i])
    }
    //formData.append('student_assignments[0]', newAssignment.student_assignments )

    await AssignmentService.create(formData)
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

  createAssignmentStudent({ commit, state, dispatch }, assignmentStudent) {
    return new Promise((resolve, reject) => {
      AssignmentService.createAssignmentStudent(assignmentStudent).then((response) => {
        commit('setAssignmentDetail', response.data)
        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true })
        resolve(response)
      }).catch((err) => {
        reject(err)
        console.log(err)
      })

    })
  },
  deleteAssignment({ commit, state, dispatch }, id) {
    return new Promise((resolve, reject) => {
      AssignmentService.delete(id).then((response) => {
        // commit('setAssignmentDetail', response.data)
        dispatch(
          'notification/success',
          {
            title: 'Elimiando exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true })
        resolve(response)

      }).catch((err) => {
        reject(err)
        console.log(err)
      })

    })
  },

  async createCourseClass({ commit, state, dispatch }, courseClass) {
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

  async getAssignmentsByCourseData({ commit }, id) {
    await AssignmentService.getAssignmentsByCourse(id)
      .then((response) => {
        commit('setAssignments', response.data)
      }).catch((err) => console.log(err))
  },
  async getAssignmentsById({ commit }, id) {
    await AssignmentService.get(id)
      .then((response) => {
        commit('setAssignment', response.data)
      }).catch((err) => console.log(err))
  },
  async getMyAssignmentsData({ commit }, { id, status }) {
    // console.log(params)
    await AssignmentService.getMyAssignments(id, status)
      .then((response) => {
        commit('setMyAssignments', response.data)
      }).catch((err) => console.log(err))
  },
  async getMyAssignmentsDetailData({ commit }, id) {
    await AssignmentService.getAssignmentsDetail(id)
      .then((response) => {
        commit('setAssignmentDetail', response.data)
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

