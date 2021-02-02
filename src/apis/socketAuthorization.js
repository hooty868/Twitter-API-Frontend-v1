import { apiSocket } from './../utils/helpers'

export default {
  socketSignIn({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiSocket.post('/login', {
      account,
      password
    }, null)
  },
}