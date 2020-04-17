import axios from "./index"

const getSeason = (id, season) => axios.get(`?i=${id}&Season=${season}`)

export {
  getSeason
}
