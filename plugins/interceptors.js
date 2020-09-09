import axios from 'axios'
import Vue from 'vue'

const getToken = () => `Bearer ${Vue.$cookies.get('token')}`

let message = ''
const instance = axios.create({
  baseURL: 'http://localhost:8080/master'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = getToken()
  return config
})
instance.interceptors.response.use(
  (response) => {
    const notification = Vue.prototype.$notification
    // if success response return it
    if (response.status === 201) {
      message = response.data.data.error
      notification.error({ message })
    }
    return response
  },
  (error) => {
    const notification = Vue.prototype.$notification
    if (typeof error.response !== 'undefined') {
      if (error.response.status === 401) {
        message = 'Looks like you do not have access to the app. Please login again'
      } else if (error.response.status === 404) {
        // unknown api call
        message = "Oops! That page couldn't be found."
      } else if (error.response.status > 501) {
        //  api call with no response
        message = 'The Connection has timed out. Please try again.'
      } else if (error.response.status === 400) {
        // bad request
        message = 'Invalid request passed to the client.'
      } else if (error.response.status === 500) {
        // code mistake in backend
        message = 'Internal server error.'
      } else {
        message = 'Something went wrong.'
      }
    } else {
      //  if network error
      message = 'Please check your internet connection.'
    }
    // call notification to show the error message
    notification.error({ message })
    return Promise.reject(error)
  }
)

export default instance
