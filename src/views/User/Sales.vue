<template>
  <div>    
    <show-products operator="seller" itemTitle="Vendas"></show-products>
</div>
</template>

<script>
import ShowProducts from '@/components/Products/ShowProducts.vue'

export default {
  name:'Sales',
  components:{
    ShowProducts
  }
}
</script>

<style>

</style>