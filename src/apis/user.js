import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')


export default {
  getUser(userId) {
    return apiHelper.get(`/users/${userId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweets(userId) {
    return apiHelper.get(`/users/${userId}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getLikes(userId) {
    return apiHelper.get(`/users/${userId}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}