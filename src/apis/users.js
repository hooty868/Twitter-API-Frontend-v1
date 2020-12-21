import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  UserProfile(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  UserSettingProfile(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  UpdateUserSettingProfile(userId, { account, name, email, password, checkPassword }) {
    const Newdata = { account, name, email, password, checkPassword }
    return apiHelper.put(`/users/${userId}/setting`, Newdata, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}