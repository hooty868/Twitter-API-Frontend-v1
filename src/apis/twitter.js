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
  }
}