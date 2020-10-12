
import TeacherService from '../../services/teachers'

const state = {
  teacher: {},
  teachers: [],
}


const getters = {
  getTeacher: state => { return state.teacher },
  getTeachers: state => { return state.teachers },
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
  }

}

const actions = {
  async createTeacher ({commit, state, dispatch}, teacher) {

    try {
      const newTeacher = {
        name: teacher.name,
        email: teacher.email,
        phone: teacher.phone,
        // turn_id: teacher.dataTurns,
        active:teacher.active,
        // comission_id: teacher.dataComissions,
      }
      const teacherCreate  = await TeacherService.create(newTeacher)
      const teachers = Object.assign([], state.teachers)

      teachers.push(teacherCreate.data.ops)

      commit('setTeachers', teachers)
      console.log(teachers)
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

  async updateTeacher ({ state, commit, dispatch }, teacher) {
    try {
        const editTeacher = {
            id: teacher.id,
            name: teacher.name,
            email: teacher.email,
            phone: teacher.phone,
            // turn_id: teacher.dataTurns,
            active:teacher.active,
            // comission_id: teacher.dataComissions,
        }
        // console.log(editTeacher)
      const teacherEdit = await TeacherService.update(teacher.id, editTeacher)
     
      const newValue = state.teachers.map((value) => {
        if (value.id === teacherEdit.data.id) {
          value = Object.assign({}, teacherEdit.data)
        }
        return value
      })
      commit('setTeachers', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
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
  }
}


export default { 
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

