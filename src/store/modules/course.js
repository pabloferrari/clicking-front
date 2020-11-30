
import CourseService from '../../services/course'

const state = {
  course: {},
  courses: [],
  courseSubject: []
}


const getters = {
  getCourse: state => { return state.course },
  getCourses: state => { return state.courses },
  getCourseSubject: state => { return state.courseSubject },
  getCourseId: state => id => {
    return state.courses.find(
      courses => courses.id === id
    )
  }
}


const mutations = {
  updatedCourses (state, course) {
    state.course = course
  },

  setCourses (state, courses) {
    state.courses = courses
  },

  setCourse (state, course) {
    state.course = course
  },

  setCourseSubject (state, courseSubject) {
    state.courseSubject = courseSubject
  }

}

const actions = {
  async createCourse ({ commit, state, dispatch }, course) {

    try {
      const newCourse = {
        subject_id: course.subject_id,
        teacher_id: course.teacher_id,
        classroom_id: course.classroom_id,
        course_type_id: 1 //course.courses
      }
      //console.log(newClassroom)
      const courseCreate = await CourseService.create(newCourse)
      const courses = Object.assign([], state.courses)

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

  async updateCourse ({ state, commit, dispatch }, course) {
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
  async deleteCourse ({ state, commit, dispatch }, id) {
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

  async getCourseById ({ commit }, id) {
    await CourseService.get(id)
      .then((response) => commit('setCourses', response.data))
      .catch((err) => console.log(err))
    // commit('setCourseSubject', courseData.data)

    // await CourseService.get(id)
    //   .then((response) => {
    //     console.log(response.data)
    //     commit('setCourses', response.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
  async getMyCoursesData ({ commit }) {
    await CourseService.getMyCourses()
      .then((response) => {
        commit('setCourses', response.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getCoursesClassroomData ({ commit }) {
    try {
      const courseData = await CourseService.getAll()
      commit('setCourses', courseData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getCourseByClassroom ({ commit }, id) {
    try {
      const courseClassroomData = await CourseService.getByCourseClassroom(id)
      commit('setCourses', courseClassroomData.data)
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

