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
      postalCode: "",
      street: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
    user_products:[]
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
    async getUserProducts(context){
      const url = `/products?user_id=${context.state.user.id}`
      const response = (await api.get(url)).data
      context.commit("UPDATE_USER_PRODUCTS", response)
    },
    async getUser(context, paylaod) {
      return api.get(`/user/${paylaod}`).then(response => {
        context.commit("UPDATE_USER", response.data)
        context.commit("UPDATE_LOGIN", true)
      })
    },
    createUser(context, payload) {
      return api.post('/user', {
        ...payload,
        id: payload.email
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