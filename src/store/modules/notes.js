import NotesService from '../../services/notes'

const state = {
  note: {},
  notes: []
}

const getters = {
  getNoteId: (state) => (id) => {
    return state.notes.find((note) => note.id === id)
  },
  getNotes: (state) => {
    return state.notes
  }
}

const mutations = {
  setNotes (state, notes) {
    state.notes = notes
  },
  setNote (state, note) {
    state.note = note
  }
}

const actions = {
  createNote ({ commit, state, dispatch }, note) {
    NotesService.create(note)
      .then((response) => {
        const notes = Object.assign([], state.notes)
        notes.push(response.data)
        commit('setNotes', notes)
        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true }
        )
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async updateNote ({ state, commit, dispatch }, note) {
    try {
      const noteEdit = await NotesService.update(note.id, note)
      const newValue = state.notes.map((value) => {
        if (value.id === noteEdit.data.id) {
          value = Object.assign({}, noteEdit.data)
        }
        return value
      })
      commit('setNotes', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteNote ({ state, commit, dispatch }, id) {
    try {
      await NotesService.delete(id)
      const index = state.notes.findIndex(x => x.id === parseInt(id))
      const notes =  [... state.notes]
      notes.splice(index, 1)
      commit('setNotes', notes)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getData ({ commit }) {
    return new Promise((resolve) => {
      NotesService.getAll()
        .then(resp => {
          commit('setNotes', resp.data)
          resolve(resp.data)
        })
        .catch(error => {
          resolve(error.response)
        })
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
