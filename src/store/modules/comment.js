import CommentService from '../../services/comments'

const state = {
  comment: {},
  comments: [],
  commentsAssignment: []
}


const getters = {
  getComment: state => { return state.comment },
  getComments: state => { return state.comments },
  getCommentsAssignment: state => { return state.commentsAssignment },
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

  updatedCommentChild (state, comment) {
    const commentChildClone = Object.assign([], state.comments)
    const commentNew = commentChildClone.map((e) => {
      if (e.comment_child.length > 0) {
        const commentChildCompare = e.comment_child.find((element) => element.children_id === comment.children_id)
        if (commentChildCompare) {
          e.comment_child.push(comment)

        }
      } else {
        e.comment_child.push(comment)
      }
      return e
    })
    state.comments = commentNew
  },

  setComments (state, comments) {
    state.comments = comments
  },
  setCommentsAsignment (state, commentsAssignment) {
    state.commentsAssignment = commentsAssignment
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
        children_id: comment.children_id,
        model_name: comment.model_name

      }

      CommentService.create(newComment).then((response) => {
        const comments = Object.assign([], state.comments)
        comments.push(response.data)
        if (newComment.children_id) {
          const newCommentData = {
            children_id: response.data.children_id,
            comment: response.data.comment,
            id: response.data.id,
            model_id: response.data.model_id,
            model_name: response.data.model_name,
            user: response.data.user
          }
          commit('updatedCommentChild', newCommentData)
        } else {
          commit('setComments', comments)
        }

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
  },
  async getCommentByAssignmentData ({ commit }, { id, userId}) {
    try {
      console.log(id, userId)
      const commentsData = await CommentService.getCommentByAssignment(id, userId)
      commit('setCommentsAsignment', commentsData.data)
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

