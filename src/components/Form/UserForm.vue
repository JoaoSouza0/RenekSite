<template>
  <form action="">
    <div v-if="userLogged" class="user">

    <label for="name">Name: </label>
    <input type="text" name="name" id="name" v-model="name" />

    <label for="email">Email: </label>
    <input type="email" name="email" id="email" v-model="email" />

    <label for="password">Password: </label>
    <input type="password" name="password" id="password" v-model="password" />
    </div>

    <label for="postalcode">Postalcode: </label>
    <input
      type="text"
      name="postalcode"
      id="postalcode"
      v-model="postalcode"
      @keyup="preencherCep"
    />

    <label for="street">Street: </label>
    <input type="text" name="street" id="street" v-model="street" />

    <label for="number">Number: </label>
    <input type="text" name="number" id="number" v-model="number" />

    <label for="neighborhood">NeightboorHood: </label>
    <input
      type="text"
      name="neighborhood"
      id="neighborhood"
      v-model="neighborhood"
    />

    <label for="city">City: </label>
    <input type="text" name="city" id="city" v-model="city" />

    <label for="state">State: </label>
    <input type="text" name="state" id="state" v-model="state" />

    <div class="button">
      <slot> </slot>
    </div>
  </form>
</template>

<script>
import { getCep } from "../../services";

export default {
  name: "UserForm",
  computed: {
    name: {
      get() {
        return this.$store.state.user.name;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { name: value });
      },
    },
    email: {
      get() {
        return this.$store.state.user.email;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { email: value });
      },
    },
    password: {
      get() {
        return this.$store.state.user.password;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { password: value });
      },
    },
    postalcode: {
      get() {
        return this.$store.state.user.postalCode;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { postalCode: value });
      },
    },
    number: {
      get() {
        return this.$store.state.user.number;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { number: value });
      },
    },
    neighborhood: {
      get() {
        return this.$store.state.user.neighborhood;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { neighborhood: value });
      },
    },
    city: {
      get() {
        return this.$store.state.user.city;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { city: value });
      },
    },
    state: {
      get() {
        return this.$store.state.user.state;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { state: value });
      },
    },
    street: {
      get() {
        return this.$store.state.user.street;
      },
      set(value) {
        this.$store.commit("UPDATE_USER", { street: value });
      },
    },
    userLogged(){
      return (!this.$store.state.login || (this.$route.name === 'edit-user'))
    }
  },
  methods: {
    async preencherCep() {
      const cep = this.postalcode.replace(/\D/g, "");
      if (cep.length === 8) {
        const response = await getCep(cep);
        this.street = response.data.logradouro;
        this.neighborhood = response.data.bairro;
        this.state = response.data.uf;
        this.city = response.data.localidade;
      }
    },
  },
};
</script>

<style scoped>
form,.user {
  display: flex;
  flex-direction: column;
}
</style>