<template>
  <div>    
    <show-products operator="seller_id" itemTitle="Vendas"></show-products>
</div>
</template>

<script>
import ShowProducts from '@/components/Products/ShowProducts.vue'
import {api} from '../../services.js'

export default {
  name:'Sales',
  data(){
    return {
      itens:''
    }
  },
  components:{
    ShowProducts
  },methods:{
    async getOperation(){
        return api.get(`/transacao?seller_id=${this.$store.state.user.id}`).
        then(response => {
          this.itens = response.data
        })
      },
  },
  computed:{
  login(){
    return this.$store.state.login
  }
  },
  watch:{
    login(){
      this.getOperation()
    }
  },
 async created()
  {
    if(this.login) {await this.getOperation()}
  }
}
</script>

<style>

</style>