import service from './service'

class AssignmentService {
  entity = 'assignments'

  getAll () {
    return service.get(`/${this.entity}`)
  }
  get (id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getAssignmentsByCourse (id) {
    return service.get(`/${this.entity}/course/${id}`)
  }
  getMyAssignments (id, status) {
    return service.get(`/my-assignments/${id}/${status}`)
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

export default new AssignmentService()
