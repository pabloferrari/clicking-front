import service from './service'

class CourseService {
  entity = 'courses'

  getAll () {
    return service.get(`/${this.entity}`)
  }
  get (id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getByCourseClassroom (id) {
    return service.get(`/${this.entity}/byClassroom/${id}`)
  }
  getMyCourses () {
    return service.get('/my-courses')
  }
  getCoursesAssignmentsCount () {
    return service.get('/my-courses-assignments-count')
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

export default new CourseService()
