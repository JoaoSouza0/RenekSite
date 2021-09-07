<template>
  <div>
    <h2>Finalizar compra</h2>
    <user-form>
      <button class="btn" @click.prevent="finalizarCompra()">
        Finalizar Compra
      </button>
    </user-form>
  </div>
</template>

<script>
import UserForm from "@/components/Form/UserForm.vue";
import { api } from "../../services.js";
import { mapState } from "vuex";
export default {
  components: {
    UserForm,
  },
  props: ["products"],
  computed: {
    ...mapState(["user"]),
    payload() {
      return {
        buyer_id: this.user.email,
        seller_id: this.products.user_id,
        product: this.products,
        address: {
          postalcode: this.user.postalcode,
          street: this.user.street,
          number: this.user.number,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          state: this.user.state,
        },
      };
    },
  },
  methods: {
    async createTransaction() {
      return api.post("/transacao", this.payload).then(() => {
        this.$router.push({ name: "purchases" });
      });
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        await this.createTransaction();
      } catch (err) {
        console.log(err);
      }
    },
    finalizarCompra() {
       if (this.$store.state.login) {
        this.createTransaction();
      } else {
        this.createUser();
      } 
    },
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

btn {
  background-color: #e87;
}
</style>