import LibraryService from '../../services/libraries'

const state = {
  library: {},
  libraries: [],
  activePrompt: false
}

const getters = {
  getLibrary: (state) => {
    return state.library
  },
  getLibraries: (state) => {
    return state.libraries
  },
  getLibraryId: (state) => (id) => {
    return state.libraries.find((libraries) => libraries.id === id)
  }
}

const mutations = {
  updatedLibrary(state, library) {
    state.library = library
  },

  setLibraries(state, libraries) {
    state.libraries = libraries
  },

  setLibrary(state, library) {
    state.library = library
  }
}

const actions = {
  createLibrary({ commit, state, dispatch }, library) {
    return new Promise((resolve, reject) => {
      LibraryService.create(library).then((response) => {
        const dataLibraries = Object.assign([], state.libraries)
        dataLibraries.push(response.data)
        commit('setLibraries', dataLibraries)
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
  async getLibraries({ commit }) {
    try {
      const librariesData = await LibraryService.getAll()
      commit('setLibraries', librariesData.data)
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
