
import CountryService from '../../services/Countries'

const state = {
  country: {},
  countries: [],
  activePrompt: false
}


const getters = {
  getCountry: state => { return state.country },
  getCountries: state => { return state.countries },
  getCountryId: state => id => {
    return state.countries.find(
      countries => countries.id === id 
    )
  }
}


const mutations = {
  updatedCountry (state, country) {
    state.country = country
  },

  setCountries (state, countries) {
    state.countries = countries
  },

  setCountry (state, country) {
    state.country = country
  }

}

const actions = {
  createCountry ({commit, state, dispatch}, country) {
    CountryService.create(country).then((response) => {
      const countries = Object.assign([], state.countries)
      countries.push(response.data)
      commit('setCountries', countries)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },

  async updateCountry ({ state, commit, dispatch }, country) {
    try {
      const countryEdit = await CountryService.update(country.id, country)
      const newValue = state.countries.map((value) => {
        if (value.id === countryEdit.data.id) {
          value = Object.assign({}, countryEdit.data)
        }
        return value
      })
      commit('setCountries', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteCountry ({ state, commit, dispatch }, id) {
    try {
      await CountryService.delete(id)
      const index = state.countries.findIndex(x => x.id === id)
      const countries =  [... state.countries]
      countries.splice(index, 1)
      commit('setCountries', countries)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getCountries ({commit}) {
    try {
      const countriesData = await CountryService.getAll() 
      commit('setCountries', countriesData.data.data)
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

