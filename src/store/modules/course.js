

import CourseService from '../../services/course'

const state = {
  course: {},
  courses: [],
  courseSubject: [],
  courseAssignmentCount: [],
  studentNotInCourse: [],
}


const getters = {
  getCourse: state => { return state.course },
  getCourses: state => { return state.courses },
  getStudentNotInCourse: state => { return state.studentNotInCourse },
  getCourseSubject: state => { return state.courseSubject },
  getCourseAssignmentCount: state => { return state.courseAssignmentCount },
  getCourseId: state => id => {
    return state.courses.find(
      courses => courses.id === id
    )
  }
}


const mutations = {
  updatedCourses(state, course) {
    state.course = course
  },

  setCourses(state, courses) {
    state.courses = courses
  },

  setCourse(state, course) {
    state.course = course
  },

  setCourseSubject(state, courseSubject) {
    state.courseSubject = courseSubject
  },
  setStudentNotInCourse(state, studentNotInCourse) {
    state.studentNotInCourse = studentNotInCourse
  },
  setCourseAssignmentCount(state, courseAssignmentCount) {
    state.courseAssignmentCount = courseAssignmentCount
  }

}

const actions = {
  async createCourse({ commit, state, dispatch }, course) {

    try {
      const newCourse = {
        subject_id: course.subject_id,
        teacher_id: course.teacher_id,
        classroom_id: course.classroom_id,
        course_type_id: 1 //course.courses
      }
      //console.log(newClassroom)
      await CourseService.create(newCourse)
      Object.assign([], state.courses)

      try {
        const courseData = await CourseService.getByCourseClassroom(newCourse.classroom_id)
        commit('setCourses', courseData.data)
      } catch (error) {
        console.log(error)
      }
      //classrooms.push(classroomCreate.data)
      //commit('setClassrooms', classrooms)

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

  addStudentInCourse({ commit, state, dispatch }, course) {
    const studentCourse = Object.assign([], course)
    const student_id = studentCourse.students.map((element) => element.id)
    const payload = {
      course_id: course.course_id,
      student_id
    }
    new Promise((resolve, reject) => {

      CourseService.addStudentInCourse(payload).then((response) => {

        resolve(response)
        commit('setCourses', response.data)
        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true }
        )
      }).catch((err) => {
        reject(err)
        console.log(err)
      })

    })
  },

  async deleteStudentCourse({ state, commit, dispatch }, id) {
    try {
      await CourseService.deleteStudentCourse(id)
      const courseState = Object.assign([], state.courses)
      const courseStudentNew = courseState.map((element) => {

        if (element.classroom.classroom_students) {
          const indexRemove = element.classroom.classroom_students.findIndex((x) => x.id === id)
          const newClassroomStudents = [...element.classroom.classroom_students]
          newClassroomStudents.splice(indexRemove, 1)

          return {
            classroom: {
              classroom_students: newClassroomStudents,
              id: element.classroom.id,
              institution_id: element.classroom.institution_id,
              name: element.classroom.name
            },
            coursetype: element.coursetype,
            id: element.id,
            subject: element.subject,
            teacher: element.teacher
          }

        }
      })
      commit('setCourses', courseStudentNew)
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

  // async updateCourse ({ state, commit, dispatch }, course) {
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
  // async deleteCourse ({ state, commit, dispatch }, id) {
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

  async getCourseById({ commit }, id) {
    await CourseService.get(id)
      .then((response) => commit('setCourses', response.data))
      .catch((err) => console.log(err))
  },
  async getMyCoursesData({ commit }) {
    await CourseService.getMyCourses()
      .then((response) => {
        commit('setCourses', response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getCoursesAssignmentsCountData({ commit }) {
    await CourseService.getCoursesAssignmentsCount()
      .then((response) => {
        commit('setCourseAssignmentCount', response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getCoursesClassroomData({ commit }) {
    try {
      const courseData = await CourseService.getAll()
      commit('setCourses', courseData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getCourseByClassroom({ commit }, id) {
    try {
      const courseClassroomData = await CourseService.getByCourseClassroom(id)
      commit('setCourses', courseClassroomData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getStudentNotInCourseData({ commit }, id) {
    try {
      const studentNotInCourse = await CourseService.getStudentNotInCourse(id)
      commit('setStudentNotInCourse', studentNotInCourse.data)
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

