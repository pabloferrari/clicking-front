import FolderService from '../../services/folder'

const state = {
  folder: {},
  folders: [],
  activePrompt: false
}


const getters = {
  getFolder: state => { return state.folder },
  getFolders: state => { return state.folders },
  getFolderId: state => id => {
    return state.folders.find(
      intitutions => intitutions.id === id
    )
  }
}


const mutations = {
  updatedfolder (state, folder) {
    state.folder = folder
  },

  setfolders (state, folders) {
    state.folders = folders
  },

  setfolder (state, folder) {
    state.folder = folder
  }
}

const actions = {
  createFolder ({ commit, state, dispatch }, folder) {
    return new Promise((resolve, reject) => {
      // const newFolder = {
      //   name: folder.name,
      //   course_id: folder.course_id
      // }
      FolderService.create(folder).then((response) => {
        const folders = Object.assign([], state.folders)
        folders.push(response.data)
        commit('setfolders', folders)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve()

      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })
  },
  createFileFolder ({ commit, state, dispatch }, folder) {
    return new Promise((resolve, reject) => {
      FolderService.createFileFolder(folder).then((response) => {
        //const folders = Object.assign([], state.folders)
        //folders.push(response.data)
        commit('setfolders', response.data)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve()

      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })
  },

  updateFolder ({ state, commit, dispatch }, folder) {
    return new Promise((resolve, reject) => {
      const editFolder = {
        id: folder.id,
        name: folder.name,
        course_id: folder.course_id

      }
      FolderService.update(folder.id, editFolder).then((response) => {
        const newValue = state.folders.map((value) => {
          if (value.id === response.data.id) {
            value = Object.assign({}, response.data)
          }
          return value
        })
        commit('setfolders', newValue)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve()

      }).catch((err) => {
        reject(err)
        console.log(err)

      })
    })

  },
  async deleteFolder ({ state, commit, dispatch }, id) {
    try {
      await FolderService.delete(id)
      const index = state.folders.findIndex(x => x.id === id)
      const folders = [...state.folders]
      folders.splice(index, 1)
      commit('setfolders', folders)
      dispatch('notification/success', { title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.' }, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getFolderData ({ commit }) {
    try {
      const foldersData = await FolderService.getAll()
      commit('setfolders', foldersData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getFolderDataId ({ commit }, id) {
    try {
      const foldersData = await FolderService.get(id)
      commit('setfolders', foldersData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getFolderByCourse ({ commit }, id) {
    try {
      const foldersData = await FolderService.getFolderByCourse(id)
      commit('setfolders', foldersData.data)
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

