import { apiHelper } from './../utils/helpers'

export default {
  TopUsers() {
    return apiHelper.get(`/users/top`)
  },
  isFollower(userId) {
    return apiHelper.post(`/followships`, { id: userId })
  },
  deletFollower(userId) {
    return apiHelper.delete(`/followships/${userId}`)
  },
}