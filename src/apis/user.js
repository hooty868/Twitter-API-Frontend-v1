import { apiHelper } from './../utils/helpers'
import { apiSocket } from './../utils/helpers'
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
  getReply(userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFollower(userId) {
    return apiHelper.get(`/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFollowing(userId) {
    return apiHelper.get(`/users/${userId}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addFollowing(followerId) {
    return apiHelper.post(`/followships`, { id: followerId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowing(followerId) {
    return apiHelper.delete(`/followships/${followerId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  socket() {
    return apiSocket.get(`/`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

}