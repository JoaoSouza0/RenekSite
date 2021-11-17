<template>
  <div>
    <show-products operator="buyer" itemTitle="Compras"/>
  </div>

</template>

<script>
import ShowProducts from '@/components/Products/ShowProducts.vue'
export default {
  name:"Purchases",
  components:{
    ShowProducts
  }
}
</script>

<style>

</style>