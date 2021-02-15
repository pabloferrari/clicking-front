import EventService from '../../services/events'

const state = {
  // Calendar Labels
  eventLabels: [],
  eventTypes: [],
    
  // Simple Calendar State
  events: []
}
  

const getters = {
  // getEvent: state => (eventId) => state.events.find((event) => event.id === eventId),
  getEvents: (state) => {
    return state.events
  },
  getEventTypes: (state) => {
    return state.eventTypes
  }
}

const mutations = {
  // ADD_EVENT (state, event) {
  //     state.events.push(event)
  // },
  // SET_EVENTS (state, events) {
  //     state.events = events
  // },
  // SET_LABELS (state, labels) {
  //     state.eventLabels = labels
  // },
  // UPDATE_EVENT (state, event) {
  //     const eventIndex = state.events.findIndex((e) => e.id === event.id)
  //     Object.assign(state.events[eventIndex], event)
  // },
  // REMOVE_EVENT (state, eventId) {
  //     const eventIndex = state.events.findIndex((e) => e.id === eventId)
  //     state.events.splice(eventIndex, 1)
  // },
  setEvents (state, newsData) {
    state.events = newsData
  },

  setEventTypes (state, labels) {
    state.eventTypes = labels
  }
}

const actions = {
  // addEvent ({ commit }, event) {
  //     return new Promise((resolve, reject) => {
  //       axios.post('/api/apps/calendar/events/', {event})
  //         .then((response) => {
  //           commit('ADD_EVENT', Object.assign(event, {id: response.data.id}))
  //           resolve(response)
  //         })
  //         .catch((error) => { reject(error) })
  //     })
  // },
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
