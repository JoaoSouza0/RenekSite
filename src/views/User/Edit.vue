<template>
  <section>
      <user-form>

        <button class="btn" @click.prevent="editUser">Edit User</button>

      </user-form>
  </section>
</template>

<script>
import UserForm from '../../components/Form/UserForm.vue'
import {api}  from '../../services.js'
export default {
  name:"UserEdit",
  components:{
    UserForm,
  },
  computed:{
    userId(){
      return this.$store.state.user.id
    }
  },
  methods:{
    editUser(){
      api.put(`/user/${this.userId}`, this.$store.state.user).then(()=>{
        this.$store.dispatch("getUser",this.userId )
        this.$router.push({name:'user'})
      })
     
    }
  }
}
</script>

<style>

</style>