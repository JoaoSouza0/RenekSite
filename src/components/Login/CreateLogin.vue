<template>
  <section>
    <h2>Create your user</h2>
    <transition mode="out-in">
      <button v-if="!create" class="btn criar" @click="create = true">
        Criar Conta
      </button>
      <user-form v-else>
        <button @click.prevent="handleClick" class="btn">Create user</button>
      </user-form>
    </transition>
  </section>
</template>

<script>
import UserForm from "@/components/Form/UserForm.vue";

export default {
  name: "CreateLogin",
  components: { UserForm },
  data() {
    return {
      create: false,
    };
  },
  methods: {
    async handleClick() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push({ name: "user" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-right: auto;
  margin-left: auto;
}
</style>