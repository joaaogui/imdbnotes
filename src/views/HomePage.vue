<template>
    <v-row
        align="center"
        justify="center"
    >
        <v-col
            cols="12"
            sm="8"
            md="4"
            class="text-center"
        >
            <v-img src="../assets/logo.png"/>
            <SearchTitle/>
        </v-col>
    </v-row>
</template>

<script>
  import SearchTitle from "@/components/SearchTitle";

  export default {
    name: "HomePage",
    components: {SearchTitle}
  }
</script>

<style scoped lang="scss">

</style>
