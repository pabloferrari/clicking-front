
import service from './service'

class EventsService {
  entity = 'events'

  getAll () {
    return service.get(`/${this.entity}`)
  }

  getEventTypes () {
    return service.get('/event-types')
  }

  get (id) {
    return service.get(`/${this.entity}/${id}`)
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

export default new EventsService()
