import ProfileService from '../../services/profile'

const state = {
  profile: {}
}

const getters = {
  getProfile: (state) => {
    return state.profile
  }
}

const mutations = {
  updatedProfile (state, profile) {
    state.profile = profile
  }
}

const actions = {
  async updateProfile ({ commit, dispatch }, profile) {
    try {
      const editProfile = await ProfileService.updateProfile(profile)
      commit('updatedProfile', editProfile)
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
  async resetPassword ({ dispatch }, profile) {
    try {
      const resp = await ProfileService.resetPassword(profile)
      if (resp) {
        dispatch(
          'notification/success',
          {
            title: 'Guardado exitoso....',
            text: 'se ha actualizado correctamente.'
          },
          { root: true }
        )
      }
    } catch (error) {
      // console.log(error)
    }
  },
  updateAvatar ({ commit, dispatch }, newData) {
    return new Promise((resolve, reject) => {
      ProfileService.updateAvatar(newData)
        .then((response) => {
          localStorage.setItem('userAuth', JSON.stringify(response.data))
          commit('auth/setAuthUser', response.data, { root: true })
          dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
          resolve(response)

        }).catch((err) => {
          reject(err)
          console.log(err)
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
