import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    input: "",
    rankedSeasons: [],
    show: {
      imageUrl: null,
      name: null,
      description: null
    }
  },
  mutations: {
    setRankedSeasons(state, rankedSeasons) {
      state.rankedSeasons = rankedSeasons
    },
    setInput(state, input) {
      state.input = input
    },
    setShow(state, show) {
      state.show.imageUrl = show.Poster
      state.show.name = show.Title
      state.show.description = show.Plot
    }
  },
  getters: {
    showAppBar: state => {
      return !!state.input
    }
  },
  actions: {},
  modules: {}
})
