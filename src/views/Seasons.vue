<template>
    <div>
        <div :class="index===0 ? 'best-season': ''" :key="season[0]" class="season"
             v-for="(season, index) in rankedSeasons">
            <span class="position">{{index + 1}}</span>
            <div class="ml-8" style="display: block">
                <div>Season: {{ season[0] }}</div>
                <div>Rating: {{ season[1].toFixed(2) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
  import {mapState} from "vuex";
  import {searchTitle} from "@/utils/rankSeasons"

  export default {
    name: "Seasons",
    computed: {
      ...mapState([
        "input",
        "rankedSeasons"
      ])
    },
    mounted() {
      if (!this.input && this.$route.params.title) {
        console.log("entrou")
        searchTitle(this.$route.params.title)
      }
    }
  }
</script>

<style lang="scss" scoped>
    .season {
        border: 2px solid gray;
        border-radius: 10px;
        margin: 5px;
        padding: 5px;
        display: flex;
    }

    .best-season {
        border: 2px solid gold;
    }

    .position {
        font-size: 28px;
    }
</style>