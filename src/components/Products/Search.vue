<template>
  <form>
      <input name="search" id="search" type="text" v-model="search" placeholder="Search">
      <input type="submit" id="searchLup"  @click.prevent="searchProduct">
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

<style scoped>

form {
    max-width: 600px;
    margin: 30px auto 60px auto;
    position: relative;
}

@media screen and (max-width: 400px) {
    form {
    max-width: 325px;
   
}
}

#search{
    width: 100%;
    padding: 20px;
    border: none;
}

#search:focus,
#search:hover{
    transform: scale(1.1);
}

#searchLup{
    width: 62px;
    height: 62px;
    background: url('../../assets/search.svg') no-repeat center center ;
    text-indent: -155px;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 0px;
    right: 0px;
    box-shadow: none;
}
</style>