import Vue from 'vue'
import Vuex from 'vuex'
import {
  api
} from '../services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      street: "",
      cellphone:"",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    user_products: []
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign({}, state.user, payload)
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.user_products = payload
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.user_products.unshift(payload)
    },
  },
  actions: {
    async getUserProducts(context) {
      try {
        const url = `/user/products/${context.state.user.id}`
        const response = (await api.get(url)).data
        context.commit("UPDATE_USER_PRODUCTS", response)
      } catch (e) {
        context.commit("UPDATE_USER_PRODUCTS", [])
      }
    },
    async getUser(context, paylaod) {
      return api.get(`/user?email=${paylaod.email}&password=${paylaod.password}`).then(response => {
        if (response.data[0]) {
          context.commit("UPDATE_USER", response.data[1])
          context.commit("UPDATE_LOGIN", true)
        }
        return response.data[0]
      }).catch((e) => {
        console.log(e)
      })
    },
    createUser(context, payload) {

      return api.post('/user', {
        ...payload,
      }).then(response => response.data[0]).catch(() => {
        this.$vToastify.error("Erro ao cadastrar verifique os campos", "Create User Error");
      })


    },
    deslogarUser(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        password: "",
        postalCode: "",
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
      })

      context.commit('UPDATE_LOGIN', false)
    }
  },
  modules: {}
})