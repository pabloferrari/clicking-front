
import service from './service'

class FolderService {
  entity = 'folders'

  getAll() {
    return service.get(`/${this.entity}`)
  }

  getFolderByCourse(id) {
    return service.get(`/${this.entity}/byCourse/${id}`)
  }

  get(id) {
    return service.get(`/${this.entity}/${id}`)
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

export default new FolderService()