import NoteContentsService from '../../services/noteContents'

const state = {
  noteContent: {},
  noteContents: []
}

const getters = {
  getNoteContentId: (state) => (id) => {
    return state.noteContents.find((note) => note.id === id)
  },
  getNoteContents: (state) => {
    return state.noteContents
  }
}

const mutations = {
  setNoteContents (state, noteContents) {
    state.noteContents = noteContents
  },
  setNoteContent (state, noteContent) {
    state.noteContent = noteContent
  }
}

const actions = {
  createNoteContent ({ dispatch }, noteContent) {
    NoteContentsService.create(noteContent)
      .then(async () => {
        await dispatch('notes/getData', {}, { root: true })
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
  async updateNote ({ dispatch }, noteContent) {
    try {
      await NoteContentsService.update(noteContent.id, noteContent)
      await dispatch('notes/getData', {}, { root: true })
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteNoteContent ({ dispatch }, id) {
    try {
      await NoteContentsService.delete(id)
      await dispatch('notes/getData', {}, { root: true })
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
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
