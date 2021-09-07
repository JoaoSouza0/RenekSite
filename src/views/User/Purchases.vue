<template>
  <div>
    <show-products operator="buyed_id" itemTitle="Compras"/>
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