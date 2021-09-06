<template>
  <section>
    <h2>Add Products</h2>
    <add-products />
    <h2>Seus Produtos</h2>
    <transition-group v-if="user_products" name="list" tag="ul">
      <li v-for="(products, index) in user_products" :key="index">
        <item :product="products">
          {{ products.descript }}
          <button class="deleteButton" @click="deleteItem(products.id)">
            Delete
          </button>
        </item>
      </li>
    </transition-group>
  </section>
</template>

<script>
import AddProducts from "@/components/Products/AddProducts.vue";
import item from "@/components/Products/item.vue";
import { api } from "../../services.js";
import { mapState, mapActions } from "vuex";

export default {
  name: "UserProducts",
  components: {
    AddProducts,
    item,
  },

  computed: {
    ...mapState(["login", "user", "user_products"]),
  },
  methods: {
    ...mapActions(["getUserProducts"]),
    deleteItem(id) {
      const confirm = window.confirm("Deseja deletar esse produto ?");
      if (confirm) {
        api.delete(`/products/${id}`).then(() => {
          this.getUserProducts();
        });
      }
    },
  },
  watch: {
    login() {
      this.getUserProducts();
    },
  },
  created() {
    if (this.login) this.getUserProducts();
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deleteButton {
  position: absolute;
  top: 0px;
  right: 0px;
  border: none;
  width: 24px;
  height: 24px;
  background: url("../../assets/remove.svg") no-repeat center center;
  overflow: hidden;
  cursor: pointer;
  text-indent: -140px;
}
</style>