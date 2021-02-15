
import BigBlueButtonService from '../../services/bigBlueButton'

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
        meeting_type: meeting.meeting_type,
        model: meeting.model,
        model_id: meeting.model_id,
        title: meeting.title
      }
      const meetingResp = await BigBlueButtonService.create(newMeeting)
        
      commit('setError', true)
      commit('setMeeting', meetingResp.meeting)
      commit('setMeetingInfo', meetingResp.meetingInfo)
      commit('setMeetingUrl', meetingResp.meetingUrl)
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
  }

//   async updateAdmin ({ state, commit, dispatch }, admin) {
//     try {
//       const editAdmin = {
//         id: admin.id,
//         name: admin.name,
//         email: admin.email,
//         password: admin.password
//       }
//       const adminEdit = await AdminService.update(admin.id, editAdmin)

//       const newValue = state.admins.map((value) => {
//         if (value.id === adminEdit.data.id) {
//           value = Object.assign({}, adminEdit.data)
//         }
//         return value
//       })
//       if (adminEdit.data) {

//         commit('setError', true)
//       }
//       commit('setAdmins', newValue)
//       dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })

//     } catch (error) {
//       // commit('setError',false);
//       console.log(error)
//     }
//   },
//   async deleteAdmin ({ state, commit, dispatch }, id) {
//     try {
//       await AdminService.delete(id)
//       const index = state.admins.findIndex(x => x.id === id)
//       const admins =  [... state.admins]
//       admins.splice(index, 1)
//       commit('setAdmins', admins)
//       dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   async getAdmins ({commit}) {
//     try {
//       const adminsData = await AdminService.getAll()
//       console.log(`ADMIN ->`, adminsData.data);
//       commit('setAdmins', adminsData.data)
//     } catch (error) {
//       console.log(error)
//     }
//   },
//   async getAdminsByInstitution ({commit}, id) {
//     try {
//       const adminsData = await AdminService.getAdminByInstitution(id)
//       commit('setAdmins', adminsData.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

