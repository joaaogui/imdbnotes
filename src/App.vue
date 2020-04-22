<template>
    <v-app>
        <v-app-bar
            height="100"
            flat
            app
            class="pr-12"
            :value="showSeasons">
            <v-img
                src="./assets/logo.png"
                max-width="100" max-height="70"
                class="mr-4"
                @click="goHome"
                style="cursor: pointer"
            />
            <SearchTitle v-if="showSeasons"/>
        </v-app-bar>
        <v-content>
            <v-container class="fill-height" fluid>
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
      goHome(){
        this.setRankedSeasons([])
        this.setInput('')
        this.$router.push("/")
      }
    }
  };
</script>
