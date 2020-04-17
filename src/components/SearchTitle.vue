<template>
    <div class="main">
        <v-text-field
            @keyup.enter="searchTitle"
            placeholder="Ex: Game Of Thrones"
            v-model="seriesName"
        />
        <div v-for="season in ranking"
             :key="season[0]">
            <p>Temporada: {{ season[0] }} Nota: {{ season[1] }}</p>
        </div>
    </div>
</template>

<script>
  import {getTitle, searchTitle} from "@/api/title"
  import {getSeason} from "@/api/season"

  export default {
    name: "SearchTitle",
    data: () => ({
      seriesName: "",
      seasonsNotes: {},
      ranking: {}
    }),
    methods: {
      async searchTitle() {
        const leanTitle = await searchTitle(this.seriesName)
        const titleId = leanTitle.data.Search[0].imdbID
        this.getTitle(titleId)
      },
      async getTitle(titleId) {
        const title = await getTitle(titleId)
        for (let seasonNumber of [...Array(Number(title.data.totalSeasons)).keys()]) {
          this.getSeasonEpisodes(titleId, seasonNumber + 1)
        }
      },
      async getSeasonEpisodes(titleId, seasonNumber) {
        const season = await getSeason(titleId, seasonNumber)
        this.getSeasonNote(season.data.Episodes, seasonNumber)
      },
      getSeasonNote(episodes, seasonNumber) {
        let seasonRating = 0
        for (let [index, episode] of episodes.entries()) {
          seasonRating += Number(episode.imdbRating)
          if (index === episodes.length - 1) {
            this.seasonsNotes[seasonNumber] = seasonRating / episodes.length
          }
        }
        this.buildRanking()
      },
      buildRanking() {
        let entries = Object.entries(this.seasonsNotes)
        let sorted = entries.sort((a, b) => a[1] - b[1])
        this.ranking = sorted.reverse()
      }
    }
  }
</script>

<style scoped lang="scss">
    .main {
        text-align: center;
    }
</style>
