import axiosInstance from 'axios'

const axios = axiosInstance.create({
  baseURL: process.env.VUE_APP_API_URL
})

export default axios