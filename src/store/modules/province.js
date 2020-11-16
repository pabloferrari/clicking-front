import ProvinceService from '../../services/provinces'

const state = {
  province: {},
  provinces: [],
  activePrompt: false
}

const getters = {
  getProvince: (state) => {
    return state.province
  },
  getProvinces: (state) => {
    return state.provinces
  },
  getProvinceId: (state) => (id) => {
    return state.provinces.find((provinces) => provinces.id === id)
  }
}

const mutations = {
  updatedProvince (state, province) {
    state.province = province
  },

  setProvinces (state, provinces) {
    state.provinces = provinces
  },

  setProvince (state, province) {
    state.province = province
  }
}

const actions = {
  createProvince ({ commit, state, dispatch }, province) {
    ProvinceService.create(province)
      .then((response) => {
        const provinces = Object.assign([], state.provinces)
        provinces.push(response.data)

        // console.log(provinces);

        // plans.map(function (data) {
        //   data.activeText = data.active == 1 ? "Activo" : "Inactivo";
        // });

        commit('setProvinces', provinces)
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

  async updateProvince ({ state, commit, dispatch }, province) {
    try {
      const provinceEdit = await ProvinceService.update(province.id, province)
      const newValue = state.provinces.map((value) => {
        if (value.id === provinceEdit.data.id) {
          value = Object.assign({}, provinceEdit.data)
        }
        return value
      })

      // newValue.map(function (data) {
      //   data.activeText = data.active == 1 ? "Activo" : "Inactivo";
      // });

      commit('setProvinces', newValue)
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
  async deleteProvince ({ state, commit, dispatch }, id) {
    try {
      await ProvinceService.delete(id)
      const index = state.provinces.findIndex((x) => x.id === id)
      const provinces = [...state.provinces]
      provinces.splice(index, 1)
      commit('setProvinces', provinces)
      dispatch(
        'notification/success',
        {
          title: 'Eliminado exitoso....',
          text: 'se ha eliminado correctamente.'
        },
        { root: true }
      )
    } catch (error) {
      console.log(error)
    }
  },
  async getProvinces ({ commit }) {
    try {
      const provincesData = await ProvinceService.getAll()
      // provincesData.data.map(function (data) {
      //   data.activeText = data.active == 1 ? "Activo" : "Inactivo";
      // });
      commit('setProvinces', provincesData.data)
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
