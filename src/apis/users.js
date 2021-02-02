import { apiHelper } from './../utils/helpers'

export default {
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`)
  },
  UserProfile(userId) {
    return apiHelper.get(`/users/${userId}`)
  },
  UserSettingProfile(userId) {
    return apiHelper.get(`/users/${userId}`)
  },
  UpdateUserSettingProfile(userId, { account, name, email, password, checkPassword }) {
    const Newdata = { account, name, email, password, checkPassword }
    return apiHelper.put(`/users/${userId}/setting`, Newdata)
  },
}