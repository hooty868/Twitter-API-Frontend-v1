import { apiHelper } from './../utils/helpers'
import { apiSocket } from './../utils/helpers'

export default {
  getUser(userId) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTweets(userId) {
    return apiHelper.get(`/users/${userId}/tweets`)
  },
  getLikes(userId) {
    return apiHelper.get(`/users/${userId}/likes`)
  },
  getReply(userId) {
    return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getFollower(userId) {
    return apiHelper.get(`/users/${userId}/followers`)
  },
  getFollowing(userId) {
    return apiHelper.get(`/users/${userId}/followings`)
  },
  addFollowing(followerId) {
    return apiHelper.post(`/followships`, { id: followerId })
  },
  deleteFollowing(followerId) {
    return apiHelper.delete(`/followships/${followerId}`)
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData)
  },
  socket() {
    return apiSocket.get(`/`)
  },

}