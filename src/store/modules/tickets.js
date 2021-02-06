import TicketsService from '../../services/tickets'

const state = {
  ticket: {},
  tickets: []
}

const getters = {
  getTicket: (state) => {
    return state.ticket
  },
  getTickets: (state) => {
    return state.tickets
  },
  getTicketId: (state) => (id) => {
    return state.tickets.find((ticket) => ticket.id === id)
  }
}

const mutations = {
  updatedTicket (state, newData) {
    state.ticket = newData
  },

  setTickets (state, newsData) {
    state.tickets = newsData
  },

  setTicket (state, newData) {
    state.ticket = newData
  }
}

const actions = {
  createTicket ({ commit, state, dispatch }, newData) {
    return new Promise((resolve, reject) => {
      const newPayload = {
        message: newData.message
      }
      TicketsService.create(newPayload).then((response) => {
        const tickets = Object.assign([], state.tickets)
        tickets.push(response.data)
        commit('setTickets', tickets)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve(tickets)
      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })
  },

  async getTickets ({ commit }) {
    try {
      const newData = await TicketsService.getAll()
      commit('setTickets', newData.data)
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
