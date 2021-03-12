import service from './service'

class MeetingService {
  entity = 'meeting';

  //   getAll () {
  //     return service.get(`/${this.entity}`)
  //   }
  //   get (id) {
  //     return service.get(`/${this.entity}/${id}`)
  //   }
  //   getAdminByInstitution (id) {
  //     return service.get(`/${this.entity}/byInstitution/${id}`)
  //   }
  create (data) {
    return service.post(`/create-meeting`, data)
  }

  finish (data) {
    return service.post(`/end-meeting`, data)
  }
//   update (id, data) {
//     return service.put(`/users/${id}`, data)
//   }
//   delete (id) {
//     return service.delete(`/users/${id}`)
//   }
}

export default new MeetingService()
