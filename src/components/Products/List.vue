<template>
  <section class="product-container">
    <div v-if="products && products.length" class="products">
      <div v-for="product in products" :key="product.id" class="product">
        <router-link to="/">
        <h2 class="title">{{ product.name }}</h2>
        <p class="price">{{ product.price }}</p>
        <p class="descript">{{ product.descript }}</p>
        </router-link>
      </div>
    </div>
    <div v-else-if="products && products.length ==0" class="no-price">
      <p>We can't be able to find a product </p>
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

<style scoped>
.products-container{
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3 ,1fr) ;
  gap: 30px;
  margin:30px;
}

.product {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover{
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}
.product img{
 border-radius: 4px;
 margin-bottom: 20px;
}
.title{
  margin-bottom: 10px;
}
.price{
  color: #e80;
  font-weight: bold;
}

.no-price{
  text-align: center;
}
</style>