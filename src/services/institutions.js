
import service from './service'

class InstitutionService {
    entity = 'institutions'

    getAll () {
      return service.get(`/${this.entity}`)
    }
    get (id) {
      return service.get(`/${this.entity}/${id}`)
    }

    getInstitutionCount(id) {
      return service.get(`/${this.entity}/${id}/dashboard`)
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

export default new InstitutionService()