import axios from 'axios'
import store from '../store/store'
import router from '../router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000
})

const getAuthToken = () => localStorage.getItem('token')

const authInterceptor = (config) => {
  config.headers['Authorization'] = `Bearer ${getAuthToken()}`
  return config
}

const errorInterceptor = error => {
  switch (error.response.status) {
  case 400:
    console.error(error.response.status, error.message)
    store.dispatch('notification/danger', {title: 'Nothing to display', text: 'Data Not Found'})
    break

  case 401:
    store.dispatch('notification/danger', {title: 'Por favor inicie sesion nuvamente', text: 'ha expirado la sesion'})
    localStorage.removeItem('token')
    localStorage.removeItem('userAuth')
    router.push('/pages/login')
    break

  default:
    store.dispatch('notification/danger',  {title: `${error.response.status}`, text: error.message})
  }
  return Promise.reject(error)
}

const responseInterceptor = response => {
  switch (response.status) {
  case 200: 
    return response.data
  default:
    return response
  }
}

service.interceptors.request.use(authInterceptor, responseInterceptor, errorInterceptor)

export default service