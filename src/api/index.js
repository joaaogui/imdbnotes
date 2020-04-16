import axiosInstance from "axios"

const axios = axiosInstance.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
    "x-rapidapi-key": process.env.VUE_APP_API_KEY
  }
})

export default axios
