import StudentService from '../../services/students'

const state = {
  student: {},
  students: [],
  studentRatings: []
}

const getters = {
  getStudent: (state) => {
    return state.student
  },
  getStudents: (state) => {
    return state.students
  },
  getStudentRatings: (state) => {
    return state.studentRatings
  },
  getStudentId: (state) => (id) => {
    return state.students.find((students) => students.id === id)
  }
}

const mutations = {
  updatedStudent (state, student) {
    state.student = student
  },

  setStudents (state, students) {
    state.students = students
  },
  setStudentRatings (state, studentRatings) {
    state.studentRatings = studentRatings
  },

  setStudent (state, student) {
    state.student = student
  }
}

const actions = {
  async createStudent ({ commit, state, dispatch }, student) {
    try {
      const newStudent = {
        name: student.name,
        email: student.email,
        description: student.name,
        password: student.password,
        active: student.active,
        institution_id: student.institution_id
      }
      const studentCreate = await StudentService.create(newStudent)
      const students = Object.assign([], state.students)

      students.push(studentCreate.data)

      commit('setStudents', students)

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

  async updateStudent ({ state, commit, dispatch }, student) {
    try {
      const editstudent = {
        id: student.id,
        name: student.name,
        email: student.email,
        active: student.active
      }

      const studentEdit = await StudentService.update(student.id, editstudent)

      const newValue = state.students.map((value) => {
        if (value.id === studentEdit.data.id) {
          value = Object.assign({}, studentEdit.data)
        }
        return value
      })
      commit('setStudents', newValue)
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
  async deleteStudent ({ state, commit, dispatch }, id) {
    try {
      await StudentService.delete(id)
      const index = state.students.findIndex((x) => x.id === id)
      const students = [...state.students]
      students.splice(index, 1)
      commit('setStudents', students)
      dispatch(
        'notification/success',
        {
          title: 'Eliminado exitoso....',
          text: 'se ha eliminado correctamente.'
        },
        { root: true }
      )
    } catch (error) {
      console.log(error)
    }
  },
  async getStudents ({ commit }) {
    try {
      const studentsData = await StudentService.getAll()
      commit('setStudents', studentsData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getStudentRatingsData ({ commit }, id) {
    try {
      const studentsData = await StudentService.getRatingStudent(id)
      commit('setStudentRatings', studentsData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getStudentsByInstitution ({ commit }, id) {
    try {
      const studentsData = await StudentService.getStudentsByInstitution(id)
      commit('setStudents', studentsData.data)
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
