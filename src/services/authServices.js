import service from './service'

class authService {
    entity = 'auth'
    login (data) {
      return service.post(`/${this.entity}/login`, data)
    }

    refresh(data) {
      return service.post(`/${this.entity}/refresh`, data)
    }

    getProfile() {
      return service.get(`/profile`)
    }
}

export default new authService()
