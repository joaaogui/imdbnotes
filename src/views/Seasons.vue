<template>
    <div>
        <p v-for="season in rankedSeasons"
           :key="season[0]">Temporada: {{ season[0] }} Nota: {{ season[1] }}</p>
    </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Seasons",
    computed: mapState({
      rankedSeasons: state => state.rankedSeasons
    })
  }
</script>

<style scoped>

</style>