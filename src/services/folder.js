
import service from './service'

class FolderService {
  entity = 'folders'

  getAll () {
    return service.get(`/${this.entity}`)
  }

  getFolderByCourse (id) {
    return service.get(`/${this.entity}/byCourse/${id}`)
  }

  get (id) {
    return service.get(`/${this.entity}/${id}`)
  }
  create (data) {
    return service.post(`/${this.entity}`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  update (id, data) {
    return service.put(`/${this.entity}/${id}`, data)
  }
  delete (id) {
    return service.delete(`/${this.entity}/${id}`)
  }
  createFileFolder (data) {
    return service.post(`/${this.entity}/addFileFolder`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
}

export default new FolderService()
