
import { apiHelper } from './../utils/helpers'
import { apiSocket } from './../utils/helpers'

export default {
  // 帶入需要的參數
  signIn({ account, password }) {
    return apiHelper.post('/login', {
      account,
      password
    })
  },
  signUp({ account, name, email, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      name,
      email,
      password,
      checkPassword
    })
  },
  socketSignIn({ account, password }) {
    return apiSocket.post('/login', {
      account,
      password
    })
  },

}
