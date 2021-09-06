import Vue from 'vue'
import Vuex from 'vuex'
import {api} from '../services'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      postalcode: "",
      rua: "",
      number: "",
      neighborhood: "",
      city:"",
      country:"",
    }
  },
  mutations: {
    UPDATE_LOGIN(state,payload){
      state.login = payload
    },
    UPDATE_USER(state , payload){
      state.user = payload
    }
  },
  actions: {
    async getUser(context, paylaod){
      const response = (await api.get(`/user/${paylaod}`)).data
      context.commit("UPDATE_USER", response)
      context.commit("UPDATE_LOGIN", true)
    }
  },
  modules: {}
})