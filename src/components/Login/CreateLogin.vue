<template>
  <section>
    <h2>Create your user</h2>
    <transition mode="out-in">
      <button v-if="create === false" class="btn criar" @click="create = true">
        Criar Conta
      </button>
      <user-form v-else/>
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
};
</script>

<style>
</style>