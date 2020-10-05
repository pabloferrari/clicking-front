
import CitiesService from '../../services/cities'

const state = {
  city: {},
  cities: [],
  activePrompt: false
}


const getters = {
  getCity: state => { return state.city },
  getCities: state => { return state.cities },
  getCityId: state => id => {
    return state.cities.find(
      cities => cities.id === id 
    )
  }
}


const mutations = {
  updatedCity (state, city) {
    state.city = city
  },

  setCities (state, cities) {
    state.cities = cities
  },

  setCity (state, city) {
    state.city = city
  }

}

const actions = {
  createCity ({commit, state, dispatch}, city) {
    CitiesService.create(city).then((response) => {
      const cities = Object.assign([], state.cities)
      cities.push(response.data)
      commit('setCities', cities)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    }).catch((err) => {
      console.log(err)
    })
  },

  async updateCity ({ state, commit, dispatch }, city) {
    try {
      const cityEdit = await CitiesService.update(city.id, city)
      const newValue = state.cities.map((value) => {
        if (value.id === cityEdit.data.id) {
          value = Object.assign({}, cityEdit.data)
        }
        return value
      })
      commit('setCities', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteCity ({ state, commit, dispatch }, id) {
    try {
      await CitiesService.delete(id)
      const index = state.cities.findIndex(x => x.id === id)
      const cities =  [... state.cities]
      cities.splice(index, 1)
      commit('setCities', cities)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getCities ({commit}) {
    try {
      const citiesData = await CitiesService.getAll() 
    //   console.log(citiesData)
      commit('setCities', citiesData.data.data)
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

