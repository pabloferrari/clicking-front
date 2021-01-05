
import AdminService from '../../services/admins'

const state = {
  admin: {},
  admins: [],
  error:false
}


const getters = {
  getAdmin: state => { return state.admin },
  getAdmins: state => { return state.admins },
  getError: state => { return state.error },
  getAdminId: state => id => {
    return state.admins.find(
      admins => admins.id === id
    )
  }
}


const mutations = {
  updatedAdmin (state, admin) {
    state.admin = admin
  },

  setAdmins (state, admins) {
    state.admins = admins
  },

  setAdmin (state, admin) {
    state.admin = admin
  },
  setError (state, error) {
    state.error = error
  }

}

const actions = {
  async createAdmin ({commit, state, dispatch}, admin) {
    
    try {
      const newAdmin = {
        email: admin.email,
        password:admin.password,
        name: admin.name,
        institution_id: admin.institution_id,
        active: admin.active
      }
      const adminCreate  = await AdminService.create(newAdmin)
      const admins = Object.assign([], state.admins)

      admins.push(adminCreate)

      commit('setError', true)
      commit('setAdmins', admins)
      dispatch(
        'notification/success',
        {title: 'Guardado exitoso....',
          text: 'se ha actualizado correctamente.'},
        { root: true }
      )

    } catch (error) {

      // commit('setError',false);
      console.log(error)
    }
  },

  async updateAdmin ({ state, commit, dispatch }, admin) {
    try {
      const editAdmin = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        password: admin.password
      }
      const adminEdit = await AdminService.update(admin.id, editAdmin)

      const newValue = state.admins.map((value) => {
        if (value.id === adminEdit.data.id) {
          value = Object.assign({}, adminEdit.data)
        }
        return value
      })
      if (adminEdit.data) {

        commit('setError', true)
      }
      commit('setAdmins', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })

    } catch (error) {
      // commit('setError',false);
      console.log(error)
    }
  },
  async deleteAdmin ({ state, commit, dispatch }, id) {
    try {
      await AdminService.delete(id)
      const index = state.admins.findIndex(x => x.id === id)
      const admins =  [... state.admins]
      admins.splice(index, 1)
      commit('setAdmins', admins)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getAdmins ({commit}) {
    try {
      const adminsData = await AdminService.getAll()
      console.log(`ADMIN ->`, adminsData.data);
      commit('setAdmins', adminsData.data)
    } catch (error) {
      console.log(error)
    }
  },
  async getAdminsByInstitution ({commit}, id) {
    try {
      const adminsData = await AdminService.getAdminByInstitution(id)
      commit('setAdmins', adminsData.data)
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

