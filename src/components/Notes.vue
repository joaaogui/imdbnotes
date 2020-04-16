<template>
  <div>
    <h1>{{ msg }}</h1>
    <h4> E descubra a melhor temporada, de acordo com as notas do IMDb</h4>
    <input
      @keyup.enter="searchTitle"
      placeholder="Ex: Game Of Thrones"
      v-model="seriesName"
    >
    <button
      @click="searchTitle"
      class="dropdown-item text-left"
      type="submit"
    >
      GO
    </button>
    <div v-for="season in ranking"
         :key="season[0]">
      <p>Temporada: {{ season[0] }} Nota: {{ season[1] }}</p>
    </div>
  </div>
</template>

<script>
  import 'lodash'
  import {getTitle} from '@/api/title'
  import {getSeasons} from '@/api/season'

  export default {
    name: 'Notes',
    props: {
      msg: String
    },
    data: () => ({
      seriesName: '',
      ranking: {}
    }),
    methods: {

      async searchTitle() {
        try {
          let seasonsNotes = {}
          const title = await getTitle(this.seriesName)
          for (let seasonNumber of [...Array(Number(title.data.totalSeasons)).keys()]) {
            seasonNumber += 1
            const season = await getSeasons(title.data.imdbID, seasonNumber)
            let seasonRating = 0
            for (let [index, episode] of season.data.Episodes.entries()) {
              let rating = episode.imdbRating
              seasonRating = Number(rating) + seasonRating
              if (index === season.data.Episodes.length - 1) {
                seasonsNotes[seasonNumber] = seasonRating / season.data.Episodes.length
                seasonRating = 0
              }
            }
          }
          let entries = Object.entries(seasonsNotes)
          let sorted = entries.sort((a, b) => a[1] - b[1])
          this.ranking = sorted
          console.log(sorted.reverse())
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
