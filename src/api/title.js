import axios from "./index"

const searchTitle = (title) => axios.get(`?page=1&r=json&s=${title}`)
const getTitle = (id) =>  axios.get(`?i=${id}&r=json`)

export {
  getTitle,
  searchTitle
}
