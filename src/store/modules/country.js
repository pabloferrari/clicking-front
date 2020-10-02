
import CountryService from '../../services/Countries'

const state = {
    country: {},
    countries:[]

}


const getters = {
    getCountry: state => { return state.country},
    getCountries: state => { return state.countries}
}


const mutations = {
    updateCountry(state,country) {
        state.country = country
    },

    setCountries(state,countries) {
        state.countries = countries
    }

}

const actions = {
    createCountry({commit,state},country ) {
        CountryService.create(country).then((response) => {
            const countries = state.countries
            countries.push(response.data)
            commit('setCountries',countries)
        }).catch((err) => {
            console.log(err)
        })
    },

    async getCountries({commit,state}) {
        try {
          const countriesData = await CountryService.getAll(); 
   
          commit('setCountries',countriesData.data.data)
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

