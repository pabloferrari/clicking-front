import EventService from '../../services/events'

const state = {
  // Calendar Labels
  eventLabels: [],
  eventTypes: [],
    
  // Simple Calendar State
  events: [],
  nextEvents: [],
  userList: []
}
  

const getters = {
  // getEvent: state => (eventId) => state.events.find((event) => event.id === eventId),
  getEvents: (state) => {
    return state.events
  },
  getNextEvents: (state) => {
    return state.nextEvents
  },
  getEventTypes: (state) => {
    return state.eventTypes
  },

  getUsers: (state) => {
    return state.userList
  }
}

const mutations = {
  
  setEvents (state, eventsData) {
    state.events = eventsData
  },

  setNextEvents (state, nextEventsData) {
    state.nextEvents = nextEventsData
  },

  setEventTypes (state, eventTypes) {
    state.eventTypes = eventTypes
  },

  setUserList (state, users) {
    state.userList = users
  }
}

const actions = {
  
  addEvent ({ commit, state, dispatch }, event) {
    EventService.create(event)
      .then((response) => {
        const events = Object.assign([], state.events)
        events.push(response)

        commit('setEvents', events)
        dispatch(
          'notification/success',
          {
            title: 'Nuevo evento',
            text: 'Se ha generado correctamente.'
          },
          { root: true }
        )
      })
      .catch((err) => {
        console.log(err)
      })
  },
  // fetchEvents ({ commit }) {
  //     return new Promise((resolve, reject) => {
  //         EventService.getAll()
  //         .then((response) => {
  //             console.log('EVENT fetchEvents -> EventService.getAll()', response);
  //             commit('SET_EVENTS', response.data)
  //             resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },
  // fetchEventLabels ({ commit }) {
  //     return new Promise((resolve, reject) => {
  //       axios.get('/api/apps/calendar/labels')
  //         .then((response) => {
  //           commit('SET_LABELS', response.data)
  //           resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },
  // editEvent ({ commit }, event) {
  //     return new Promise((resolve, reject) => {
  //       axios.post(`/api/apps/calendar/event/${event.id}`, {event})
  //         .then((response) => {
    
  //           // Convert Date String to Date Object
  //           const event = response.data
  //           event.startDate = new Date(event.startDate)
  //           event.endDate = new Date(event.endDate)
    
  //           commit('UPDATE_EVENT', event)
  //           resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },
  // removeEvent ({ commit }, eventId) {
  //     return new Promise((resolve, reject) => {
  //       axios.delete(`/api/apps/calendar/event/${eventId}`)
  //         .then((response) => {
  //           commit('REMOVE_EVENT', response.data)
  //           resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },
  // eventDragged ({ commit }, payload) {
  //     return new Promise((resolve, reject) => {
  //       axios.post(`/api/apps/calendar/event/dragged/${payload.event.id}`, {payload})
  //         .then((response) => {
    
  //           // Convert Date String to Date Object
  //           const event = response.data
  //           event.startDate = new Date(event.startDate)
  //           event.endDate = new Date(event.endDate)
    
  //           commit('UPDATE_EVENT', event)
  //           resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },

  async getEventTypes ({ commit }) {
    try {
      const eventTypes = await EventService.getEventTypes()
      commit('setEventTypes', eventTypes)
    } catch (error) {
      console.log(error)
    }
  },

  async getEvents ({ commit }) {
    try {
      const events = await EventService.getAll()
      commit('setEvents', events.data)
      commit('setNextEvents', events.next)
    } catch (error) {
      console.log(error)
    }
  },

  async getUsers ({ commit }, filter) {
    try {
      const users = await EventService.findUser(filter)
      commit('setUserList', users)
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
