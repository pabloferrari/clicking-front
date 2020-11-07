
import TurnService from '../../services/turns'

const state = {
  turn: {},
  turns: []
}


const getters = {
  getTurn: state => { return state.turn },
  getTurns: state => { return state.turns },
  getTurnId: state => id => {
    return state.turns.find(
      turns => turns.id === id
    )
  }
}


const mutations = {
  updatedTurn (state, turn) {
    state.turn = turn
  },

  setTurns (state, turns) {
    state.turns = turns
  },

  setTurn (state, turn) {
    state.turn = turn
  }

}

const actions = {
  async createTeacher ({commit, state, dispatch}, turn) {

    try {
      const newTurn = {
        name: turn.name,
        institution_id: turn.institution_id
      }
      const turnCreate  = await TurnService.create(newTurn)
      const turns = Object.assign([], state.turns)

      turns.push(turnCreate.data)

      commit('setTurns', turns)

      dispatch(
        'notification/success',
        {title: 'Guardado exitoso....',
          text: 'se ha actualizado correctamente.'},
        { root: true }
      )
    } catch (error) {
      console.log(error)
    }
  },

  async updateTeacher ({ state, commit, dispatch }, turn) {
    try {
      const editTurn = {
        name: turn.name,
        institution_id: turn.institution_id
      }
      const turnEdit = await TurnService.update(turn.id, editTurn)

      const newValue = state.turns.map((value) => {
        if (value.id === turnEdit.data.id) {
          value = Object.assign({}, turnEdit.data)
        }
        return value
      })
      commit('setTurns', newValue)
      dispatch('notification/success', {title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async deleteTurn ({ state, commit, dispatch }, id) {
    try {
      await TurnService.delete(id)
      const index = state.turns.findIndex(x => x.id === id)
      const turns =  [... state.turns]
      turns.splice(index, 1)
      commit('setTurns', turns)
      dispatch('notification/success', {title: 'Eliminado exitoso....', text: 'se ha eliminado correctamente.'}, { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async getTurns ({commit}) {
    try {
      const turnData = await TurnService.getAll()
      commit('setTurns', turnData.data)
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

