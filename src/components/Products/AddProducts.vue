<template>
  <form class="add-products">
    <label for="name">Name: </label>
    <input type="text" id="name" name="name" v-model="product.name" />

    <label for="price">Price: </label>
    <input type="text" id="price" name="price" v-model="product.price" />

    <label for="photo">Photo: </label>
    <input type="file" id="photo" name="photo" ref="photo" />

    <label for="descript">Descrição: </label>
    <textarea
      type="text"
      id="descript"
      name="descript"
      v-model="product.descript"
    />

    <input
      @click.prevent="handleClick"
      type="button"
      class="btn"
      value="Add Product"
    />
  </form>
</template>

<script>
import { api } from "../../services";
export default {
  name: "AddProducts",
  data() {
    return {
      product: {
        name: "",
        price: "",
        descript: "",
        photo: "null",
      },
    };
  },
  methods: {
    format() {
      this.product.user_id = this.$store.state.user.id;
    },
    handleClick() {
      this.format()
      api.post("/products", this.product).then(() => {
        this.$store.dispatch("getUserProducts");
      });
    },
  },
};
</script>

<style>
.add-products {
  display: flex;
  flex-direction: column;
}
</style>