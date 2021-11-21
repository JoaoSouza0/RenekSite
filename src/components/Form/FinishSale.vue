<template>
  <div>
    <h2>Finalizar compra</h2>
    <label for="quantity">Quantity: </label>
    <input type="text" name="quantity" id="quantity" v-model="quantity" />
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
  data(){
    return{
      quantity:1,
    }
  },
  props: ["products"],
  computed: {
    ...mapState(["user"]),
    quantityPayload(){
      return this.products.quantity - this.quantity
    },
    payload() {
      return {
        buyer_id: this.user.id,
        seller_id: this.products.user_id,
        product_id: this.products.id, 
        quantity: Number(this.quantity),
        total_vl: this.quantity * this.products.price
      };
    },
  },
  methods: {
    async createTransaction() {
      return api
        .post("/transacao", this.payload)
        .then(() => {
          api.put(`products/${this.products.id}`, {...this.products,
            quantity:String(this.quantityPayload)
          })
          this.$router.push({ name: "purchases" });
        })
        .catch(() => {
          this.$vToastify.error("Erro transação compra", "Buy product Error");
        });
    },
    async createUser() {
      try {
        const createResult = await this.$store.dispatch(
          "createUser",
          this.$store.state.user
        );
        if (createResult) {
          const getResult = await this.$store.dispatch("getUser", {
            email: this.$store.state.user.email,
            password: this.$store.state.user.password,
          });
          if (getResult) {
            await this.createTransaction();
          }
        }
      } catch (err) {
        this.$vToastify.error(
          "Erro ao finalizar compra verifique o formulario",
          "Finish Sale Error"
        );
      }
    },
    finalizarCompra() {
      console.log(this.quantityPayload)
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