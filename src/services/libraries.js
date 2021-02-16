import service from './service'

class LibraryService {
  entity = 'libraries';

  getAll () {
    return service.get(`/${this.entity}`)
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
}

export default new LibraryService()
