<template>
  <ul v-if="pagesTotal > 1">
    <li v-for="(page, index) in paginasRange" :key="index">
      <router-link :to="{ query: query(page) }">{{ page }}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    productsTotal: {
      type: Number,
      default: 0,
    },
    productsPerPage: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    paginasRange() {
      const current = Number(this.$route.query._page);
      const range = 9;
      const offSet = Math.ceil(range / 2);
      const total = this.pagesTotal;
      const pagesArray = [];

      for (let i = 1; i < total; i++) {
          pagesArray.push(i)
          
      }
        pagesArray.splice( 0 , current -offSet)
        pagesArray.splice(range, total)
        return pagesArray

    },
    pagesTotal() {
      const total = this.productsTotal / this.productsPerPage;
      return total != Infinity ? Math.ceil(total) : 0;
    },
  },
  methods: {
    query(page) {
      return {
        ...this.$route.query,
        _page: page,
      };
    },
  },
};
</script>

<style scoped>
ul {
  grid-column: 1/-1;
  margin: 20px;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background-color: var(--primary-color);
  color: #fff;
}
</style>