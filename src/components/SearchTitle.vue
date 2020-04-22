<template>
    <v-text-field
        @keyup.enter="searchTitle"
        placeholder="Ex: Game Of Thrones"
        v-model="seriesName"
        hide-details
    />
</template>

<script>
  import {getTitle} from "@/api/title"
  import {getSeasons} from "@/api/season"
  import {mapMutations, mapState} from "vuex"

  export default {
    name: "SearchTitle",
    data: () => ({
      seriesName: ""
    }),
    mounted() {
      console.log(this.input)
      this.seriesName = this.input
    },
    computed: {
      ...mapState([
        "input"
      ])
    },
    methods: {
      ...mapMutations([
        "setRankedSeasons",
        "setInput"
      ]),
      async searchTitle() {
        this.setInput(this.seriesName)
        const title = await getTitle(this.seriesName)
        this.getSeasonsEpisodes(title.data.imdbID, Number(title.data.totalSeasons))
      },
      async getSeasonsEpisodes(titleId, seasons) {
        let seasonsNotes = {}
        for (let seasonNumber of [...Array(seasons).keys()]) {
          const season = await getSeasons(titleId, seasonNumber + 1)
          seasonsNotes[seasonNumber + 1] = this.getSeasonNote(season.data.Episodes)
        }
        this.rankSeasons(seasonsNotes)
      },
      getSeasonNote(episodes) {
        let seasonRating = 0
        for (let [index, episode] of episodes.entries()) {
          seasonRating += Number(episode.imdbRating)
          if (index === episodes.length - 1) {
            return seasonRating / episodes.length
          }
        }
      },
      rankSeasons(seasonsNotes) {
        let entries = Object.entries(seasonsNotes)
        let sorted = entries.sort((a, b) => b[1] - a[1])
        this.setRankedSeasons(sorted)
        this.$router.push({name: "Seasons", params: {title: this.seriesName}})
      }
    }
  }
</script>