import service from "./service";

class StudentsService {
  entity = "students";
  urlTest = "http://vmserverdev:3400/api"
  getAll() {
    return service.get(`${this.urlTest}/${this.entity}`);
  }
  get(id) {
    return service.get(`/${this.entity}/${id}`);
  }
  create(data) {
    return service.post(`${this.urlTest}/create/${this.entity}`, data);
  }
  update(id, data) {
    return service.put(`${this.urlTest}/update/${this.entity}/${id}`, data);
  }
  delete(id) {
    return service.delete(`${this.urlTest}/remove/${this.entity}/${id}`);
  }
}

export default new StudentsService();
