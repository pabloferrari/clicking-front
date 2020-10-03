
import CountryService from '../../services/Countries'

const state = {
    country: {},
    countries:[],
    activePrompt: false

}


const getters = {
    getCountry: state => { return state.country},
    getCountries: state => { return state.countries},
    
    getCountryId:(state,id) => {
        return state.countries.find(
            countries => countries.id == id 
        )
    }
}


const mutations = {
    updatedCountry(state,country) {
        state.country = country
    },

    setCountries(state,countries) {
        state.countries = countries
    },

    setCountry(state,country) {
        state.country = country
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

    updateCountry({commit,state},country) {
        commit('updatedCountry',{
            name: country.name,
            code: country.code,
            id: country.id
        })
        console.log(country)
    },

    // getCountry({commit,state},id) {
    //     // commit('updateCountry',state.country)
    //     CountryService.get(id)
    //     .then((response) => {
    //         // const {data} = response
    //         // const countryd = state.country
    //         // state.coutry = response.data.data
    //         const country = {
    //             name:response.data.data.name
    //             ,code: response.data.data.code
    //         }
    //         commit('updateCountry',country)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    //     // try {
    //     //     const {data} = await CountryService.get(id)
      
    //     //     commit('updateCountry',data.data)
    //     // } catch (error) {
    //     //     console.log(error)
    //     // }
    // },

    async getCountry({commit,state},id) {
        try {
          const countriesData = await CountryService.get(id); 
            console.log(countriesData.data)
          commit('updatedCountry',countriesData.data.data)
        } catch (error) {
            console.log(error)
        }
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

