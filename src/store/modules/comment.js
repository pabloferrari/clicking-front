import CommentService from '../../services/comments'

const state = {
  comment: {},
  comments: []
}


const getters = {
  getComment: state => { return state.comment },
  getComments: state => { return state.comments },
  getCommentId: state => id => {
    return state.comments.find(
      comments => comments.id === id
    )
  }
}


const mutations = {
  updatedComment (state, comment) {
    state.comment = comment
  },

  setComments (state, comments) {
    state.comments = comments
  },

  setComment (state, comment) {
    state.comment = comment
  }
}

const actions = {
  createComment ({ commit, state, dispatch }, comment) {
    return new Promise((resolve, reject) => {
      const newComment = {
        comment: comment.comment,
        model_id: comment.model_id,
        model_name: comment.model_name

      }
      CommentService.create(newComment).then((response) => {
        const comments = Object.assign([], state.comments)
        comments.push(response.data)
        commit('setComments', comments)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve(comments)

      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })

  },
  async getCommentsData ({ commit }) {
    try {
      const commentsData = await CommentService.getAll()
      commit('setComments', commentsData.data)
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

