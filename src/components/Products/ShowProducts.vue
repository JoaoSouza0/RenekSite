<template>
  <section>
    <div>
      <h2>{{ itemTitle }}</h2>
      <div class="product-wrapper" v-for="(item, index) in itens" :key="index">
        <product-item v-if="item" :product="item">
          <p class="seller">
            <span>{{operator}}: </span>
            {{ userInfos.name }}
          </p>
        </product-item>
      </div>
      <slot></slot>
    </div>
  </section>
</template>

<script>
import ProductItem from "./item.vue";
import { api } from "../../services.js";
import { mapState } from "vuex";
export default {
  name: "ShowProducts",
  data() {
    return {
      itens: null,
      userInfos:null,
    };
  },
  props: {
    operator: {
      default: null,
      type: String,
    },
    itemTitle: {
      type: String,
    },
  },
  components: {
    ProductItem,
  },
  methods: {
    getOperation() {
      api
        .get(`/user/transaction/${this.operator}/${this.user.id}`)
        .then((response) => {
          this.itens = response.data[1]
          this.userInfos= response.data[0]
        });
    },
  },
  computed: {
    ...mapState(["user", "login"]),
  },
  watch: {
    login() {
      this.getOperation();
    },
  },
  created() {
    if (this.login) this.getOperation();
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>