import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://simple-twitter-2020.herokuapp.com/api'
const socketURL = 'https://socket-go.herokuapp.com/api'

const apiConfig = axios.create({
  baseURL
})

apiConfig.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, error => {
  Promise.reject(error)
})

export const apiHelper = apiConfig

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const apiSocket = axios.create({
  socketURL
})
