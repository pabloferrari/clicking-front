import service from './service'

class authService {
    entity = 'auth'
    login (data) {
      return service.post(`/${this.entity}/login`, data)
    }
}

export default new authService()