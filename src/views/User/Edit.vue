<template>
  <section>
    <user-form>
      <button class="btn" @click.prevent="editUser">Edit User</button>
    </user-form>
  </section>
</template>

<script>
import UserForm from "../../components/Form/UserForm.vue";
import { api } from "../../services.js";
export default {
  name: "UserEdit",
  components: {
    UserForm,
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
  },
  methods: {
    editUser() {
      api
        .put(`/user/${this.userId}`, this.$store.state.user)
        .then(async () => {
          const getResult = await this.$store.dispatch("getUser", {
            email: this.$store.state.user.email,
            password: this.$store.state.user.password,
          });
          if (getResult) {
            this.$router.push({ name: "user" });
          }
        })
        .catch(() => {
          this.$vToastify.error("Erro ao atualizar usuario", "Edit user Error");
        });
    },
  },
};
</script>

<style>
</style>