<template>
    <div class="hello">
        <link rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
              integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
              crossorigin="anonymous">
        <h1>{{ msg }}</h1>
        <h4> E descubra a melhor temporada, de acordo com as notas do IMDb</h4>
        <input v-model="seriesName" @keyup.enter="say" placeholder="Ex: Game Of Thrones">
        <button type="submit" class="dropdown-item text-left" v-on:click="say">GO</button>
        <div v-if="found">
            <div v-for="(x, index) in ranking">
                <p class=" best-season" v-if="index === 0 ">Temporada: {{ x[0] }} Nota: {{ x[1] }}</p>
                <p class="rest" v-else>Temporada: {{ x[0] }} Nota: {{ x[1] }}</p>
                <p></p>
            </div>
        </div>
        <div v-else>
            <p> Série não Encontrada </p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'lodash';
    import * as _ from "lodash";


    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data: function () {
            return {
                seriesName: "",
                info: {},
                found: true
            }
        },
        computed: {
            ranking: function () {

                var sortable = [];
                for (var vehicle in this.info) {
                    sortable.push([vehicle, this.info[vehicle]]);
                }

                sortable.sort(function (a, b) {
                    return b[1] - a[1];
                });

                return sortable
            }
        },
        methods: {
            say: function () {
                var seasonNotes = {}
                let url = `http://www.omdbapi.com/?t=${this.seriesName}&apikey=5799c6fa`
                axios
                    .get(url)
                    .then(response => {

                        if (response.data.Response === "False" || response.data.Type === "movie") {
                            this.found = false
                        } else {
                            this.found = true
                            for (const seasonNumber of _.range(1, parseInt(response.data.totalSeasons) + 1)) {
                                let url = `http://www.omdbapi.com/?t=${this.seriesName}&Season=${seasonNumber}&apikey=5799c6fa`
                                axios
                                    .get(url)
                                    .then(response => {
                                        var sum = 0
                                        for (const episode in response.data.Episodes) {
                                            if (isNaN(response.data.Episodes[episode].imdbRating))
                                                continue
                                            sum += parseFloat(response.data.Episodes[episode].imdbRating)
                                        }
                                        seasonNotes[seasonNumber] = (sum / parseInt(response.data.Episodes.length)).toFixed(2)

                                        this.info = "Season: " + seasonNumber + " Nota: " + (sum / parseInt(response.data.Episodes.length)).toFixed(2)
                                        this.info = seasonNotes

                                    })
                            }
                        }

                    })
                    .catch(error => (this.found = false))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .best-season {
        font-weight: bold;
    }
    .rest {

    }
    h3 {
        margin: 40px 0 0;
    }
</style>
