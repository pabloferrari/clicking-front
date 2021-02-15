import service from './service'

class BigBlueButtonService {
  entity = 'bigbluebutton';

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
    return service.post(`/${this.entity}/create-meeting`, data)
  }
//   update (id, data) {
//     return service.put(`/users/${id}`, data)
//   }
//   delete (id) {
//     return service.delete(`/users/${id}`)
//   }
}

export default new BigBlueButtonService()
