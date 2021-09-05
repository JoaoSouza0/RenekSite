<template>
  <section class="product-container">
    <div v-if="products" class="products">
      <div v-for="product in products" :key="product.id">
        <h2 class="title">{{ product.name }}</h2>
        <p class="price">{{ product.price }}</p>
        <p class="descript">{{ product.descript }}</p>
      </div>
    </div>
    
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helper.js";
export default {
  name: "List",
  data() {
    return {
      products: null,
    };
  },
  computed: {
    url() {
      return serialize(this.$route.query);
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  methods: {
    async getProducts() {
      const productResponse = await api.get(`/products${this.url}`);
      this.products = productResponse.data;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style>
</style>