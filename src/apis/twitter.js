import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  TwitterAll() {
    return apiHelper.get(`/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postTwitter({ description }) {
    return apiHelper.post(`/tweets`, { description },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  getTwitterDetail(id) {
    return apiHelper.get(`/tweets/${id}`,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  getReplyList(id) {
    return apiHelper.get(`/tweets/${id}/replies`,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  likeTwitter(Id) {
    return apiHelper.post(`/tweets/${Id}/like`, null,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  unlikeTwitter(twitterId) {
    return apiHelper.post(`/tweets/${twitterId}/unlike`, null,
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  replyTwitter(twitterId, { comment }) {
    return apiHelper.post(`/tweets/${twitterId}/replies`, { comment },
      {
        headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
}