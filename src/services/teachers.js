import service from './service'

class TeacherService {
  entity = 'teachers';
  getAll () {
    return service.get(`/${this.entity}`)
  }
  get (id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getTeacherByInstitution (id) {
    return service.get(`/${this.entity}/byInstitution/${id}`)
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

export default new TeacherService()
