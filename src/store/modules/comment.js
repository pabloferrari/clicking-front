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

  updatedCommentChild (state, comments) {
    const commentChildClone = Object.assign([], state.comments)
    const newComments = commentChildClone.map((element) => {
      const commentCurrent = element.child.find((child) => child.children_id === comments.children_id)
      if (commentCurrent) {
        element.child.push(comments)
      } else if (element.id === comments.children_id) {
        element.child.push(comments)
      }
      return element

    })
    state.comments = newComments
  },

  setComments (state, comments) {

    state.comments = comments
  },
  setCommentsAsignment (state, commentsAssignment) {
    state.commentsAssignment = commentsAssignment
  },

  setComment (state, comment) {
    state.comments = comment
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
        if (newComment.children_id) {
          commit('updatedCommentChild', response.data)
        } else {
          const comments = Object.assign([], state.comments)
          comments.push(response.data)
          commit('setComments', comments)
        }
        resolve(response.data)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
      }).catch((err) => {
        reject(err)
        console.log(err)
      })
    })

  },

  async createCommentFromAssignment ({ commit, state, dispatch }, comment) {
    return new Promise((resolve, reject) => {
      // console.log('hola', comment)
      const newComment = {
        comment: comment.comment,
        model_id: comment.model_id,
        children_id: comment.children_id,
        model_name: comment.model_name,
        to_user_id: comment.to_user_id

      }

      CommentService.create(newComment).then((response) => {
        const comments = Object.assign([], state.commentsAssignment)
        comments.push(response.data)
        // console.log(response.data)
        //   comments.push({
        //     comment: response.data.comment,
        //     user: response.data.user
        // if (newComment.children_id) {
        // const newCommentData = {
        //   comment: response.data.comment,
        //   user: response.data.user
        // }
        commit('setCommentsAsignment', comments)
        //   commit('updatedCommentChild', newCommentData)
        // } else {
        //   commit('setComments', comments)
        dispatch('notification/success', { title: 'Guardado exitoso....', text: 'se ha actualizado correctamente.' }, { root: true })
        resolve(response.data)


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
  async getCommentByAssignmentData ({ commit }, { id, userId }) {
    try {
      const commentsData = await CommentService.getCommentByAssignment(id, userId)
      // console.log(commentsData)
      const comments = Object.assign([], commentsData.data)
      commit('setCommentsAsignment', comments)
    } catch (error) {
      console.log(error)
    }
  },
  async getCommentByCourseData ({ commit }, id) {
    try {
      const commentsData = await CommentService.getCommentByCourse(id)
      const comments = Object.assign([], commentsData.data)
      commit('setComments', comments)
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

