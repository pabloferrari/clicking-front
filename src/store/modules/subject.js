
import SubjectService from '../../services/subjects'

const state = {
  subject: {},
  subjects: [],
  activePrompt: false
}


const getters = {
  getSubject: state => { return state.subject },
  getSubjects: state => { return state.subjects },
  getSubjectId: state => id => {
    return state.subjects.find(
      subjects => subjects.id === id
    )
  }
}


const mutations = {
  updatedSubject (state, subject) {
    state.subject = subject
  },

  setSubjects (state, subjects) {
    state.subjects = subjects
  },

  setSubject (state, subject) {
    state.subject = subject
  }

}

const actions = {
  createSubject ({commit, state, dispatch}, subject) {
    SubjectService.create(subject).then((response) => {
      const subjects = Object.assign([], state.subjects)
      subjects.push(response.data)
      commit('setSubjects', subjects)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },
  async updateSubject ({ state, commit, dispatch }, subject) {
    try {
      const subjectEdit = await SubjectService.update(subject.id, subject)
      const newValue = state.subjects.map((value) => {
        if (value.id === subjectEdit.data.id) {
          value = Object.assign({}, subjectEdit.data)
        }
        return value
      })
      commit('setSubject', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteSubject ({ state, commit, dispatch }, id) {
    try {
      await SubjectService.delete(id)
      const index = state.subjects.findIndex(x => x.id === id)
      const subjects =  [... state.subjects]
      subjects.splice(index, 1)
      commit('setSubjects', subjects)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getSubjects ({commit}) {
    try {
      const subjectsData = await SubjectService.getAll()
      commit('setSubjects', subjectsData.data)
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

