import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  TopUsers() {
    return apiHelper.get(`/users/top`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  isFollower(userId) {
    return apiHelper.post(`/followships`, { id: userId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deletFollower(userId) {
    return apiHelper.delete(`/followships/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}