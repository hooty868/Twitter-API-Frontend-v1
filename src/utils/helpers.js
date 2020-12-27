import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://simple-twitter-2020.herokuapp.com/api'
const socketURL = 'https://socket-go.herokuapp.com/api'


export const apiHelper = axios.create({
  baseURL
})

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

export const apiSocket = axios.create({
  socketURL
})
