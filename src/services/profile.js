import service from './service'
import store from '../store/store'

class ProfileService {
  entity = 'profile';

  updateProfile (data) {
    return service.put(`/${this.entity}`, data)
  }

  updateAvatar (data) {
    return service.post(`/${this.entity}/update-avatar`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }

  async resetPassword (data) {
    const resp = await service.put(`/${this.entity}/reset-password`, data)
      .then(response => {
        return response
      })
      .catch(error => {
        console.log('ProfileService error', error.response.data)
        const title = 'Unprocessable Entity'
        let text = ''
        const values = Object.values(error.response.data)
        values.forEach(element => {
          console.log(element)
          text += `${element} <br>`
        })
        store.dispatch('notification/danger', {title, text})
        return false
      })
    return resp ? resp : false
  }
}

export default new ProfileService()
