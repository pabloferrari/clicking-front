
import axios from '../axios'


class CountryService {

    entity = 'countries'

    getAll() {
        return axios.get(`/${this.entity}`)
    }

    get(id) {
        return axios.get(`/${this.entity}/${id}`)
    }

    create(data) {
        return axios.post(`/${this.entity}`,data)
    }

    update(data) {
        return axios.put(`/${this.entity}/${id}`,data)
    }
}


export default new CountryService()