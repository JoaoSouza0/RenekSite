<template>
  <section>
    <div class="product" v-if="product">
      <router-link
        class="product-img"
        :to="{ name: 'products', params: { id: product.id } }"
      >
        <img v-if="product.photo" :src="product.photo[0].src" alt="" />
        <p>See Product</p>
      </router-link>
      <div class="info">
        <h2 class="title">{{ product.name }}</h2>
        <p class="price">{{ product.price | priceNumber }}</p>
        <slot></slot>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "item",
  props: ["product"],
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  gap: 20px;
  margin-bottom: 40px;
  position: relative;
}
.info {
  align-self: end;
}
.product-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}

@media screen and (max-width: 400px) {
  .product {
    display: flex;
    justify-content: space-around;
  }
}
</style>