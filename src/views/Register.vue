<template>
  <div id="register">
    <b-alert fade show dismissible @dismissed="alertsDismissed" v-if="alerts.length > 0">
      <div v-for="error in alerts">{{ error[0] }}</div>
    </b-alert>
    <b-form v-on:submit.prevent="register">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" type="email" v-model="form.email" required placeholder="Enter email" />
      </b-form-group>

      <b-form-group label="Full name:" label-for="fullname">
        <b-form-input id="fullname" type="text" v-model="form.fullname" required placeholder="Enter name" />
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" type="password" v-model="form.password" required placeholder="Enter password" />
      </b-form-group>

      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>

<script>
  export default {
    name: "register",
    data() {
      return {
        form: {
          fullname: "",
          email: "",
          password: "",
        },
        alerts: []
      }
    },
    methods: {
      register(){
        this.$axios.post('members', this.form).then(resp => {
          console.log(resp);
          this.$router.push({name: 'login', params: {
              registerSuccessful: true,
            }});
        }).catch(err => {
          this.alerts = err.response.data.error;
          console.log(this.alerts);
        })
      },
      alertsDismissed(){
        this.alerts = [];
      }
    }
  }
</script>

<style scoped lang="scss">
  #register{
    padding: 20px;
  }
</style>