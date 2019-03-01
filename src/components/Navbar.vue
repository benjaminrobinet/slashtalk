<template>
  <div id="nav">
    <b-nav pills>
      <b-nav-item v-for="item in items" :key="item.path" v-if="shouldBeDisplayed(item)" :to="item.path" :active="item.active" @click="handleClick(item)">{{ item.name }}</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data(){
      return {
        items: [
          {
            'name': 'Home',
            'path': '/',
            'action': null,
            'active': true,
            'logState': null // null: whatever | true: has to be logged in | false: has to be logged out
          },{
            'name': 'Register ',
            'path': '/register',
            'action': null,
            'active': false,
            'logState': false
          },{
            'name': 'Login',
            'path': '/login',
            'action': null,
            'active': false,
            'logState': false
          },{
            'name': 'Members',
            'path': '/members',
            'action': null,
            'active': false,
            'logState': true
          },{
            'name': 'Logout',
            'path': null,
            'action': this.logout,
            'active': false,
            'logState': true,
          }
        ]
      }
    },
    methods: {
      logout(){
        this.$axios.delete("members/signout").then(resp => {
          this.$store.commit('setToken', null);
          this.$store.commit('setMember', null);
        }).catch(err => {
          this.$store.commit('setToken', null);
          this.$store.commit('setMember', null);
        });
        this.$router.push('/');
      },
      handleClick(item){
        if(item.action){
          item.action();
        }
      },
      changeActive(to){
        let active = this.items.find(item => {
          return item.path === to.path;
        });
        this.items.forEach(o => {
          o.active = o === active;
        });
      },
      shouldBeDisplayed(item){
        if(item.logState === true){
          return this.loggedIn;
        } else if(item.logState === false){
          return !this.loggedIn;
        } else {
          return true;
        }
      }
    },
    mounted(){
      this.changeActive(this.$router.currentRoute);
    },
    computed:{
      loggedIn(){
        return this.$store.getters.member !== null
      }
    },
    watch: {
      '$route' (to, from) {
        this.changeActive(to);
      }
    }
  }
</script>

<style scoped lang="scss">
  #nav{
    padding: 20px;
  }
</style>