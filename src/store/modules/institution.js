import InstitutionService from '../../services/institutions'

const state = {
  institution: {},
  institutions: [],
  activePrompt: false
}


const getters = {
  getInstitution: state => { return state.institution },
  getInstitutions: state => { return state.institutions },
  getInstitutionId: state => id => {
    return state.institutions.find(
      intitutions => intitutions.id === id
    )
  }
}


const mutations = {
  updatedInstitution (state, institution) {
    state.institution = institution
  },

  setInstitutions (state, institutions) {
    state.institutions = institutions
  },

  setInstitution (state, institution) {
    state.institution = institution
  }
}

const actions = {
  createInstitution ({ commit, state, dispatch }, institution) {
    return new Promise((resolve, reject) => {
      const newInstution = {
        name: institution.name,
        email: institution.email,
        phone: institution.phone,
        cuit: institution.cuit,
        plan_id: institution.dataPlans,
        city_id: institution.dataCities,
        image: '',
        active: 1
      }
      InstitutionService.create(newInstution).then((response) => {
        const intitutions = Object.assign([], state.institutions)
        intitutions.push(response.data)
        commit('setInstitutions', intitutions)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve()

      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })
    // const newInstution = {
    //   name: institution.name,
    //   email: institution.email,
    //   phone: institution.phone,
    //   cuit: institution.cuit,
    //   plan_id: institution.dataPlans,
    //   city_id: institution.dataCities,
    //   image: '',
    //   active: 1
    // }
    // await InstitutionService.create(newInstution).then((response) => {
    //   const intitutions = Object.assign([], state.institutions)
    //   intitutions.push(response.data)
    //   commit('setError', false)
    //   commit('setInstitutions', intitutions)
    //   dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })


    // }).catch((err) => {
    //   commit('setError', true)
    //   console.log(err)
    // })
  },

  updateInstitution ({ state, commit, dispatch }, institution) {
    return new Promise((resolve, reject) => {
      const editInstution = {
        id: institution.id,
        name: institution.name,
        email: institution.email,
        phone: institution.phone,
        cuit: institution.cuit,
        plan_id: institution.dataPlans,
        city_id: institution.dataCities,
        image: null,
        active: !!(institution.active)
      }
      InstitutionService.update(institution.id, editInstution).then((response) => {
        const newValue = state.institutions.map((value) => {
          if (value.id === response.data.id) {
            value = Object.assign({}, response.data)
          }
          return value
        })
        commit('setInstitutions', newValue)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve()

      }).catch((err) => {
        reject(err)
        console.log(err)

      })
    })
    // try {
    // await InstitutionService.update(institution.id, editInstution).then((response) => {
    //   const newValue = state.institutions.map((value) => {
    //     if (value.id === response.data.id) {
    //       value = Object.assign({}, response.data)
    //     }
    //     return value
    //   })
    //   commit('setInstitutions', newValue)
    //   dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
    //   commit('setError', false)

    // }).catch((err) => {
    //   console.log(err)
    //   commit('setError', true)
    // })
  },
  async deleteInstitution ({ state, commit, dispatch }, id) {
    try {
      await InstitutionService.delete(id)
      const index = state.institutions.findIndex(x => x.id === id)
      const institutions = [...state.institutions]
      institutions.splice(index, 1)
      commit('setInstitutions', institutions)
      dispatch('notification/success', { title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.' }, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getInstitutions ({ commit }) {
    try {
      const intitutionsData = await InstitutionService.getAll()
      commit('setInstitutions', intitutionsData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getInstitutionById ({ commit }, id) {
    try {
      const intitutionsData = await InstitutionService.get(id)
      commit('setInstitution', intitutionsData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getInstitutionCount ({ commit }, id) {
    try {
      const intitutionsData = await InstitutionService.getInstitutionCount(id)
      commit('setInstitution', intitutionsData.data)
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

