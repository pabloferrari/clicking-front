import NewsService from '../../services/news'

const state = {
  new: {},
  news: []
}

const getters = {
  getNew: (state) => {
    return state.new
  },
  getNews: (state) => {
    return state.news
  },
  getNewId: (state) => (id) => {
    return state.news.find((news) => news.id === id)
  }
}

const mutations = {
  updatedNew (state, newData) {
    state.new = newData
  },

  setNews (state, newsData) {
    state.news = newsData
  },

  setNew (state, newData) {
    state.new = newData
  }
}

const actions = {
  createNews ({ commit, state, dispatch }, newData) {
    return new Promise((resolve, reject) => {
      // const newPayload = {
      //   title: newData.title,
      //   description: newData.description,
      //   date: newData.date,
      //   public: newData.public,
      //   files: newData.files
      // }
      NewsService.create(newData).then((response) => {
        const news = Object.assign([], state.news)
        news.push(response.data)
        commit('setNews', news)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve(news)

      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })
  },

  async getNewsData ({ commit }) {
    try {
      const newData = await NewsService.getAll()
      commit('setNews', newData.data)
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
