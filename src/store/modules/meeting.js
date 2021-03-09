
import MeetingService from '../../services/meeting'

const state = {
  meeting: {},
  meetingInfo: '',
  meetingUrl: '',
  users: [],
  error:false
}


const getters = {
  getMeeting: state => { return state.meeting },
  getMeetingInfo: state => { return state.meetingInfo },
  getMeetingUrl: state => { return state.meetingUrl },
  getUsers: state => { return state.users }
}


const mutations = {
  updatedMeeting (state, meeting) {
    state.meeting = meeting
  },
  updatedMeetingInfo (state, meetingInfo) {
    state.meetingInfo = meetingInfo
  },
  updatedMeetingUrl (state, meetingUrl) {
    state.meetingUrl = meetingUrl
  },
  updatedUsers (state, users) {
    state.users = users
  },
  setMeeting (state, meeting) {
    state.meeting = meeting
  },
  setMeetingInfo (state, meetingInfo) {
    state.meetingInfo = meetingInfo
  },
  setMeetingUrl (state, meetingUrl) {
    state.meetingUrl = meetingUrl
  },
  setUsers (state, users) {
    state.users = users
  },
  setError (state, error) {
    state.error = error
  }

}

const actions = {
  async create ({commit, state, dispatch}, meeting) {
    
    try {
      const newMeeting = {
        model: meeting.model,
        model_id: meeting.model_id,
        link: meeting.link
      }
      const meetingResp = await MeetingService.create(newMeeting)
      commit('setMeeting', meetingResp)
      commit('setMeetingInfo', meetingResp)
      commit('setMeetingUrl', meetingResp.link)
      commit('setUsers', meetingResp.users)
      dispatch(
        'notification/success',
        {title: 'Meeting Generada....',
          text: ''},
        { root: true }
      )

    } catch (error) {

    //   commit('setError',false);
      console.log(error)
    }
  },

  async finish ({commit, state, dispatch}, meeting) {
    
    try {
      const meetingResp = await MeetingService.finish({ meetingId: meeting.id })
        
      commit('setError', true)
      commit('setMeeting', {})
      commit('setMeetingInfo', {})
      commit('setMeetingUrl', "")
      commit('setUsers', [])
      dispatch(
        'notification/success',
        {title: 'Meeting Generada....',
          text: ''},
        { root: true }
      )

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

