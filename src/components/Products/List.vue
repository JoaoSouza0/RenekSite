<template>
  <section class="product-container">
    <transition mode="out-in">
      <div v-if="products && products.length" class="products" key="products">
        <div v-for="(product, index) in products" :key="index" class="product">
          <router-link :to="{ name: 'products', params: { id: product.id } }">
            <h2 class="title">{{ product.name }}</h2>
            <p class="price">{{ product.price | priceNumber }}</p>
            <p class="descript">{{ product.descript }}</p>
          </router-link>
        </div>
        <pagination
          :productsTotal="productsTotal"
          :productsPerPage="productsPerPage"
        ></pagination>
      </div>
      <div
        v-else-if="products && products.length == 0"
        class="no-price"
        key="cant-find"
      >
        <p>We can't be able to find a product</p>
      </div>
      <div v-else key="loading">
        <loading-page />
      </div>
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helper.js";
import Pagination from "@/components/Products/Pagination.vue";
export default {
  name: "List",
  data() {
    return {
      products: null,
      productsPerPage: 5,
      productsTotal: 0,
    };
  },
  components: {
    Pagination,
  },
  computed: {
    url() {
      return `?_limit=${this.productsPerPage}${serialize(this.$route.query)}`;
    },
  },
  watch: {
    url() {
      this.getProducts();
    },
  },
  methods: {
    async getProducts() {
      this.products = null;
      const productResponse = await api.get(`/products${this.url}`);
      this.productsTotal = Number(productResponse.headers["x-total-count"]);
      this.products = productResponse.data;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.products-container {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.product img {
  border-radius: 4px;
  margin-bottom: 20px;
}
.title {
  margin-bottom: 10px;
}
.price {
  color: #e80;
  font-weight: bold;
}

.no-price {
  text-align: center;
}
</style>