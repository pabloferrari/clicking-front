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
  updatedLibrary (state, library) {
    state.library = library
  },

  setLibraries (state, libraries) {
    state.libraries = libraries
  },

  setLibrary (state, library) {
    state.library = library
  }
}

const actions = {
  // createPlan ({ commit, state, dispatch }, plan) {
  //   PlanService.create(plan)
  //     .then((response) => {
  //       const plans = Object.assign([], state.plans)
  //       plans.push(response.data)

  //       console.log(plans)

  //       plans.map(function (data) {
  //         data.activeText = data.active === 1 ? 'Activo' : 'Inactivo'
  //       })

  //       commit('setPlans', plans)
  //       dispatch(
  //         'notification/success',
  //         {
  //           title: 'Guardado exitoso....',
  //           text: 'se ha actualizado correctamente.'
  //         },
  //         { root: true }
  //       )
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },

  // async updatePlan ({ state, commit, dispatch }, plan) {
  //   try {
  //     const planEdit = await PlanService.update(plan.id, plan)
  //     const newValue = state.plans.map((value) => {
  //       if (value.id === planEdit.data.id) {
  //         value = Object.assign({}, planEdit.data)
  //       }
  //       return value
  //     })

  //     newValue.map(function (data) {
  //       data.activeText = data.active === 1 ? 'Activo' : 'Inactivo'
  //     })

  //     commit('setPlans', newValue)
  //     dispatch(
  //       'notification/success',
  //       {
  //         title: 'Guardado exitoso....',
  //         text: 'se ha actualizado correctamente.'
  //       },
  //       { root: true }
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  // async deletePlan ({ state, commit, dispatch }, id) {
  //   try {
  //     await PlanService.delete(id)
  //     const index = state.plans.findIndex((x) => x.id === id)
  //     const plans = [...state.plans]
  //     plans.splice(index, 1)
  //     commit('setPlans', plans)
  //     dispatch(
  //       'notification/success',
  //       {
  //         title: 'Eliminado exitoso....',
  //         text: 'se ha eliminado correctamente.'
  //       },
  //       { root: true }
  //     )
  //   } catch (error) {
  //     console.log(error)
  //   }
  // },
  async getLibraries ({ commit }) {
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
