<template>
  <section class="login">
    <h1>Login</h1>
    <form action="">
        <label for="email">E-mail</label>
        <input type="email" name="email" id="email" v-model="login.email">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" v-model="login.password">
        <button class="btn" @click.prevent= "handleLogin">Logar</button>
    </form>
    <p class="lostPassword">
        <a href="/" target="_blank">Lost password ? click here</a>
    </p>
    <create-login/>
  </section>
</template>

<script>
import createLogin from '@/components/Login/CreateLogin.vue'

export default {
    name:"Login",
    data(){
        return{
            login:{
                email:"",
                password:""
            },
        }
    },
    components:{
        createLogin
    },
    methods:{
        handleLogin(){
            this.$store.dispatch("getUser", this.login.email)
            this.$router.push({name:'user'})
        }
    }

};
</script>

<style scoped>
.login{
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}
form{
    display: grid;
}
.btn{
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
}

.lostPassword{
    text-align: center;
    margin: 20px auto 0 auto;
}
.lostPassword a:hover{
    text-decoration: underline;
    color: var(--primary-color)
}
h1{
    text-align: center;
    font-size: 2rem;
    margin-top:40px;
    color: var(--primary-color)
}

</style>