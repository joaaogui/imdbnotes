<template>
    <v-app>
        <v-app-bar
            :value="showSeasons"
            app
            class="pr-12"
            flat
            height="100">
            <v-img
                @click="goHome"
                class="mr-4" max-height="70"
                max-width="100"
                src="./assets/logo.png"
                style="cursor: pointer"
            />
            <SearchTitle v-if="showSeasons"/>
        </v-app-bar>
        <v-content>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
  import SearchTitle from "./components/SearchTitle";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: "App",
    components: {SearchTitle},
    computed: {
      ...mapGetters([
        "showSeasons"
      ])
    },
    methods: {
      ...mapMutations([
        "setRankedSeasons",
        "setInput"
      ]),
      goHome() {
        this.setRankedSeasons([])
        this.setInput("")
        this.$router.push("/")
      }
    }
  };
</script>
