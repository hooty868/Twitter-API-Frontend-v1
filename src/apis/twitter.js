import { apiHelper } from './../utils/helpers'

export default {
  TwitterAll() {
    return apiHelper.get(`/tweets`)
  },
  postTwitter({ description }) {
    return apiHelper.post(`/tweets`, { description })
  },
  getTwitterDetail(id) {
    return apiHelper.get(`/tweets/${id}`)
  },
  getReplyList(id) {
    return apiHelper.get(`/tweets/${id}/replies`)
  },
  likeTwitter(Id) {
    return apiHelper.post(`/tweets/${Id}/like`, null)
  },
  unlikeTwitter(twitterId) {
    return apiHelper.post(`/tweets/${twitterId}/unlike`, null)
  },
  replyTwitter(twitterId, { comment }) {
    return apiHelper.post(`/tweets/${twitterId}/replies`, { comment })
  },
}