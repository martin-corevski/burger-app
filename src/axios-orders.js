import axios from 'axios'

const instance = axios.create({
  // Set your firebase app url
  baseURL: ''
})

// // https://github.com/axios/axios#interceptors
// axios.interceptors.request.use(request => {
//   console.log('axios INSTANCE interceptors request: ', request)
//   // Edit request config
//   return request
// }, error => {
//   // request error handling, like loss of internet connection, server problems..
//   console.log('axios INSTANCE interceptors request error: ', error)
//   return Promise.reject(error)
// })

// axios.interceptors.response.use(response => {
//   console.log('axios INSTANCE interceptors response: ', response)
//   // Edit response config
//   return response
// }, error => {
//   // request error handling, like loss of internet connection, server problems..
//   console.log('axios INSTANCE interceptors response error: ', error)
//   return Promise.reject(error)
// })

export default instance
