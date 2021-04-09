import axios from 'axios'
import store from '../store/store'
import router from '../router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000000,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  }
})

const getAuthToken = () => localStorage.getItem('token')

const authInterceptor = (config) => {
  config.headers['Authorization'] = `Bearer ${getAuthToken()}`
  return config
}

const errorInterceptor = async (error) => {
  if (error.response) {
    switch (error.response.status) {
    case 400:
      console.error(error.response.status, error.message)
      store.dispatch('notification/danger', {title: 'Nothing to display', text: 'Data Not Found'})
      break

    // eslint-disable-next-line no-case-declarations
    case 401:
      const titleAuth = error.response.data && error.response.data.message === 'email or password incorrect' ? 'Email y/o contraseña incorrecta' : 'Por favor inicie sesion nuvamente'
      const textAuth = error.response.data && error.response.data.message === 'email or password incorrect' ? 'Verifique los datos ingresados' : 'Por favor inicie sesion nuvamente'
      store.dispatch('notification/danger', { title: titleAuth, text: textAuth })
      localStorage.removeItem('token')
      localStorage.removeItem('userAuth')
      router.push('/pages/login')
      break

    // eslint-disable-next-line no-case-declarations
    case 422:
      const title = 'Error'
      let text = ''
      const values = Object.values(error.response.data.message)
      values.forEach(element => {
        text += `${element} <br>`
      })
      store.dispatch('notification/danger', {title, text})
      break

    default:
      console.log(`errorInterceptor -> `, error);
      store.dispatch('notification/danger',  {title: `${error.response.status}`, text: error.message})
    }
    return Promise.reject(error)
  } else {
    console.log(`else errorInterceptor -> ${typeof error}`, error);
    if(typeof error == 'string') {
      const err = error.split('at');
      store.dispatch('notification/danger',  {title: `Ocurrió un error.`, text: `${err[0]}`})
    } else {
      console.log(`errorInterceptor -> ${Object.keys(error)}`);
      store.dispatch('notification/danger',  {title: 'Ocurrió un error.', text: 'Error de red.' })
    }
  }
}

const responseInterceptor = (response) => {
  switch (response.status) {
  case 200:
    return response.data
  default:
    return response
  }
}

service.interceptors.request.use(authInterceptor)
service.interceptors.response.use(responseInterceptor, errorInterceptor)

export default service
