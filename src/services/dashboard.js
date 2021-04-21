import service from './service'

class DashboardService {
  entity = 'dashboard'
  get () {
    return service.get(`/${this.entity}`)
  }
}

export default new DashboardService()
