import service from './service'

class CommentService {
  entity = 'comments';
  getAll () {
    return service.get(`/${this.entity}`)
  }
  get (id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getCommentByAssignment (id, userId) {
    return service.get(`/${this.entity}/byAssignment/${id}/${userId}`)
  }
  getCommentByCourse (id) {
    return service.get(`/${this.entity}/byCourse/${id}`)
  }
  create (data) {
    return service.post(`/${this.entity}`, data)
  }
  update (id, data) {
    return service.put(`/${this.entity}/${id}`, data)
  }
  delete (id) {
    return service.delete(`/${this.entity}/${id}`)
  }
}

export default new CommentService()
