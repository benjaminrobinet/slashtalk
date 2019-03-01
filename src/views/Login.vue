<template>
  <div id="login">
    <b-alert fade show dismissible @dismissed="alertsDismissed" v-if="alerts.length > 0">
      <div v-for="error in alerts">{{ error }}</div>
    </b-alert>
    <b-form  v-on:submit.prevent="login">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email" />
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter name" />
      </b-form-group>

      <b-button type="submit" variant="primary">Login</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        form: {
          email: "benjamin.robinet@free.fr",
          password: "password",
        },
        alerts: []
      }
    },
    methods: {
      login(){
        this.$axios.post('members/signin', this.form).then(resp => {
          this.$store.commit('setToken', resp.data.token);
          this.$store.commit('setMember', {fullname: resp.data.fullname, id: resp.data._id, email: resp.data.email});
          this.$router.push('/');
        }).catch(err => {
          alert(err.response.data.error);
        })
      }
    },
    computed:{
      loggedIn(){
        return this.$store.getters.member !== null
      }
    },
    mounted(){
      if(this.loggedIn){
        console.log('already logged in');
        this.$router.push('/');
      }
    }
  }
</script>

<style scoped>
  #login{
    padding: 20px;
  }
</style>