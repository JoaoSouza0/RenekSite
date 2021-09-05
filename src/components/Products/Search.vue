<template>
  <form>
      <input name="search" id="search" type="text" v-model="search">
      <input type="submit" id="" value="Search Product" @click.prevent="searchProduct">
  </form>
</template>

<script>
export default {
    name: "Search",
    data(){
        return{
            search:""
        }
    },
    methods:{
        searchProduct(){
            this.$router.push({ query:{ q:this.search } })
        }
    }
}
</script>

<style>

</style>