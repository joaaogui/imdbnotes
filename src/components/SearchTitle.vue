<template>
    <v-text-field
        @keyup.enter="searchTitle"
        hide-details
        placeholder="Enter the show name"
        v-model="seriesName"
        :loading="loading"
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
      async searchTitle() {
        this.loading = true
        await searchTitle(this.seriesName)
        this.loading = false
        this.$router.push({name: "Seasons", params: {title: this.seriesName}})
      }
    }
  }
</script>