import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import User from '../views/User/User.vue'
import UserProducts from '../views/User/Products.vue'
import UserEdit from '../views/User/Edit.vue'
import UserPurchases from '../views/User/Purchases.vue'
import UserSales from '../views/User/Sales.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products/:id',
    name: 'products',
    component: Products,
    props:true
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user',
    component: User,
    children:[
      {
        path:"",
        name:"user",
        component:UserProducts
      },
      {
        path:"sales",
        name:"sales",
        component:UserSales
      },
      {
        path:"edit",
        name:"edit-user",
        component:UserEdit
      },
      {
        path:"purchases",
        name:"purchases",
        component:UserPurchases
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(){
    return window.scrollTo({top: 0, behavior:"smooth"})
  }
})

export default router
