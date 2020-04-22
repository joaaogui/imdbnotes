import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: "",
    rankedSeasons: []
  },
  mutations: {
    setRankedSeasons (state, rankedSeasons) {
      state.rankedSeasons = rankedSeasons
    },
    setInput (state, input) {
      state.input = input
    }
  },
  getters: {
    showSeasons: state => {
      return !!state.rankedSeasons.length
    }
  },
  actions: {
  },
  modules: {
  }
})
