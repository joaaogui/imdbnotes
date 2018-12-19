<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <input v-model="message" @keyup.enter="say" placeholder="Me edite">
        <p>{{ info }}</p>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'lodash';

    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data: function () {
            return {
                message: "",
                info: ""
            }
        },
        methods: {
            say: function (x) {
                let url = `http://www.omdbapi.com/?t=${this.message}&apikey=5799c6fa`
                axios
                    .get(url)
                    .then(response => {
                        this.info = response.data.totalSeasons
                        for (const seasonNumber of _.range(1, parseInt(response.data.totalSeasons) + 1)) {
                            let url = `http://www.omdbapi.com/?t=${this.message}&Season=${seasonNumber}&apikey=5799c6fa`
                            axios
                                .get(url)
                                .then(response => {
                                    var sum = 0
                                    for (const episode in response.data.Episodes) {
                                        sum += parseFloat(response.data.Episodes[episode].imdbRating)
                                        // console.log(sum)
                                    }
                                    
                                    console.log("Season: " + seasonNumber + " Nota: " + (sum/parseInt(response.data.Episodes.length)).toFixed(2))
                                })
                        }
                    })
                    .catch(error => (this.info = "Série não encontrada"))

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
