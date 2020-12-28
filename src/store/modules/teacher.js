
import TeacherService from '../../services/teachers'

const state = {
  teacher: {},
  teachers: [],
  error:false
}


const getters = {
  getTeacher: state => { return state.teacher },
  getTeachers: state => { return state.teachers },
  getError: state => { return state.error },
  getTeacherId: state => id => {
    return state.teachers.find(
      teachers => teachers.id === id
    )
  }
}


const mutations = {
  updatedTeacher (state, teacher) {
    state.teacher = teacher
  },

  setTeachers (state, teachers) {
    state.teachers = teachers
  },

  setTeacher (state, teacher) {
    state.teacher = teacher
  },
  setError (state, error) {
    state.error = error
  }

}

const actions = {
  async createTeacher ({commit, state, dispatch}, teacher) {

    try {
      const newTeacher = {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        description:'Teacher user',
        password:teacher.password,
        active:teacher.active

      }
      const teacherCreate  = await TeacherService.create(newTeacher)
      const teachers = Object.assign([], state.teachers)

      teachers.push(teacherCreate.data)

      commit('setError', true)
      commit('setTeachers', teachers)
      dispatch(
        'notification/success',
        {title: 'Guardado exitoso....',
          text: 'se ha actualizado correctamente.'},
        { root: true }
      )

    } catch (error) {

      // commit('setError',false);
      console.log(error)
    }
  },

  async updateTeacher ({ state, commit, dispatch }, teacher) {
    try {
      const editTeacher = {
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        active:teacher.active
      }
      const teacherEdit = await TeacherService.update(teacher.id, editTeacher)

      const newValue = state.teachers.map((value) => {
        if (value.id === teacherEdit.data.id) {
          value = Object.assign({}, teacherEdit.data)
        }
        return value
      })
      if (teacherEdit.data) {

        commit('setError', true)
      }
      commit('setTeachers', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })

    } catch (error) {
      // commit('setError',false);
      console.log(error)
    }
  },
  async deleteTeacher ({ state, commit, dispatch }, id) {
    try {
      await TeacherService.delete(id)
      const index = state.teachers.findIndex(x => x.id === id)
      const teachers =  [... state.teachers]
      teachers.splice(index, 1)
      commit('setTeachers', teachers)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getTeachers ({commit}) {
    try {
      const teachersData = await TeacherService.getAll()
      commit('setTeachers', teachersData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getTeachersByInstitution ({commit}, id) {
    try {
      const teachersData = await TeacherService.getTeacherByInstitution(id)
      commit('setTeachers', teachersData.data)
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

