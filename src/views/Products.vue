<template>
  <section>
    <div v-if="products" class="products">
      <ul class="photo">
        <li>
          <img src="../assets/photos.jpg" alt="photo.title" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ products.name }}</h1>
        <p class="price">{{ products.price | priceNumber }}</p>
        <p class="descript">{{ products.descript }}</p>
        <transition v-if="products.quantity > 0" mode="out-in">
          <button class="btn" v-if="!final" @click="final =true ">Comprar</button>
          <final-sale v-else :products="products"/>
        </transition>
        <button class="btn" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <loading-page v-else />
  </section>
</template>

<script>
import { api } from "../services";
import FinalSale from "../components/Form/FinishSale.vue";
export default {
  name: "Products",
  props: ["id"],
  components: {
    FinalSale,
  },
  data() {
    return {
      products: null,
      final:false,
      
    };
  },
  methods: {
    async getProduto() {
      const response = await api.get(`/products/${this.id}`);
      this.products = response.data;
      console.log(this.products)
    },
  },
  created() {
    this.getProduto();
  },
};
</script>

<style scoped>
.products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.price {
  color: #e86;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descript {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
}
</style>