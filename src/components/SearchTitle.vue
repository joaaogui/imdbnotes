<template>
    <v-text-field
        :loading="loading"
        @keyup.enter="searchTitle"
        hide-details
        placeholder="Enter the show name"
        v-model="seriesName"
    />
</template>

<script>
  import {mapState} from "vuex"
  import {searchTitle} from "@/utils/rankSeasons"

  export default {
    name: "SearchTitle",
    data: () => ({
      seriesName: "",
      loading: false
    }),
    mounted() {
      this.seriesName = this.input
    },
    computed: {
      ...mapState([
        "input"
      ])
    },
    methods: {
      searchTitle() {
        searchTitle(this.seriesName).then(
          this.$router.push({name: "Seasons", params: {title: this.seriesName}})
        )
      }
    }
  }
</script>