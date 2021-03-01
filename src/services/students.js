import service from './service'

class StudentsService {
  entity = 'students';
  getAll() {
    return service.get(`/${this.entity}`)
  }
  get(id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getStudentsByInstitution(id) {
    return service.get(`/${this.entity}/byInstitution/${id}`)
  }
  getRatingStudent(id) {
    return service.get(`/student/ratings/${id}`)
  }
  create(data) {
    return service.post(`/${this.entity}`, data)
  }
  update(id, data) {
    return service.put(`/${this.entity}/${id}`, data)
  }
  delete(id) {
    return service.delete(`/${this.entity}/${id}`)
  }
}

export default new StudentsService()
