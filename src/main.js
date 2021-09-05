import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoadingPage from '@/components/LoadingPage'
Vue.config.productionTip = false

Vue.component("LoadingPage",LoadingPage )
Vue.filter("priceNumber", value =>{

  value = Number(value)
  if(!isNaN(value)){
   return value.toLocaleString("pt-BT", {
     style: "currency",
     currency:"BRL"
   })
  }
  return ""
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')