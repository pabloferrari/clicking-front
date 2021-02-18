import service from './service'

class AssignmentService {
  entity = 'assignments'

  getAll() {
    return service.get(`/${this.entity}`)
  }
  get(id) {
    return service.get(`/${this.entity}/${id}`)
  }
  getAssignmentsByCourse(id) {
    return service.get(`/${this.entity}/course/${id}`)
  }
  getMyAssignments(id, status) {
    return service.get(`/my-assignments/${id}/${status}`)
  }
  getAssignmentsDetail(id) {
    return service.get(`/${this.entity}/detail/${id}`)
  }
  getAssignmentsFileTeacher(id, user_id) {
    return service.get(`/${this.entity}/file-teacher/${id}/${user_id}`, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  getAssignmentsFileStudent(id, user_id) {
    return service.get(`/${this.entity}/file-student/${id}/${user_id}`, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  create(data) {
    return service.post(`/${this.entity}`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  createAssignmentStudent(data) {
    return service.post('/assignment-students', data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  createAssignmentStudentJson(data) {
    return service.post('/assignment-students', data)
  }
  update(id, data) {
    return service.put(`/${this.entity}/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': '*' } })
  }
  delete(id) {
    return service.delete(`/${this.entity}/${id}`)
  }
  deleteFileStudent(id, assignment_id, user_id) {
    return service.delete(`/${this.entity}/delete-file-student/${id}/${assignment_id}/${user_id}`)
  }
}

export default new AssignmentService()
