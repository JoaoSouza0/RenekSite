<template>
  <section class="home">

    <h1>✌🏾Compre ou Venda✌🏾</h1>
    
    <search-products/>
    <list-products />
  </section>
</template>

<script>
// @ is an alias to /src
import SearchProducts from '@/components/Products/Search.vue'
import ListProducts from '@/components/Products/List.vue' 
export default {
  name: 'Home',
  components:{
    SearchProducts,
    ListProducts
    
  }
}
</script>
<style scoped>
h1{
  color: var(--primary-color);
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
