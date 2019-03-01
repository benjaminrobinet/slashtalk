<template>
  <div id="app" v-if="online">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from "./components/Navbar";

  export default {
    data(){
      return {
        online: false
      }
    },
    mounted(){
      this.$axios.get('ping').then(resp => {
        this.online = true;
        let member = this.$store.getters.member;
        let token = this.$store.getters.token;
        if(member && token){
          this.$axios.get('members/' + member._id + '/signedin').then(resp => {
            this.$store.commit('setMember', resp.data);
          }).catch((err) => {
            this.$store.commit('setToken', null);
            this.$store.commit('setMember', null);
          });
        } else {
          this.$store.commit('setToken', null);
          this.$store.commit('setMember', null);
        }
      }).catch(err => {
        this.online = false;
      })
    },
    methods: {
      logout(){
        this.$axios.delete("members/signout").then(resp => {
          this.$store.commit('setToken', null);
          this.$store.commit('setMember', null);
          console.log(resp);
        }).catch(err => {
          console.log(err);
        });
      }
    },
    computed:{
      loggedIn(){
        return this.$store.getters.member !== null
      }
    },
    components: {
      Navbar
    }
  }
  // API key: f2c5d1bd9d7a4a70a23e4650245df658
</script>


<style lang="scss">
  body, html{
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #nav{
    padding: 25px;
  }
</style>
