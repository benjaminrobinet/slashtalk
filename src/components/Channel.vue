<template>
  <div class="content-wrapper">
    <div class="channel">
      <ul>
        <b-media tag="li" v-for="msg in orderedMessages" :key="msg._id" class="mb-1">
          <b-img slot="aside" blank blank-color="#e2e2e2" width="64" alt="placeholder" />

          <h5 class="mt-0 mb-1">{{ getMemberById(msg.member_id).fullname }} <small>{{ msg.updated_at | moment("calendar") }}</small> </h5>
          <p class="mb-0">
            {{ msg.message }}
          </p>
        </b-media>
        <!--<li v-for="msg in channel_messages">{{ msg.message }}</li>-->
      </ul>
    </div>
    <div class="add-msg d-flex align-items-center">
      <div class="container-fluid">
        <b-form class="d-flex flex-nowrap " inline @submit.prevent="sendMessage">
          <b-input-group class="mr-2 flex-grow-1">
            <b-input-group-text slot="prepend"><font-awesome-icon icon="envelope"/></b-input-group-text>
            <b-input id="message" v-model="message" placeholder="Enter your message..." />
          </b-input-group>
          <b-button @click="sendMessage">Send</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Channel",
    props: {
      'channel': Object
    },
    data(){
      return {
        message: '',
        channel_messages: []
      }
    },
    mounted(){
      this.getMessages();
    },
    watch: {
      channel: function (new_channel) {
        this.channel_messages = [];
        this.message = '';
        this.getMessages();
        this.getMembers();
      },
    },
    computed: {
      orderedMessages: function() {
        return this.channel_messages.sort(function(a,b){
          return new Date(b.updated_at) - new Date(a.updated_at);
        });
      }
    },
    methods: {
      getMessages(){
        this.$axios.get('channels/' + this.channel._id + '/posts').then(resp => {
          this.channel_messages = resp.data;
        }).catch(err => {
          console.error(err);
        });
      },
      sendMessage(){
        if(this.channel._id){
          this.$axios.post('channels/' + this.channel._id + '/posts', {
            message: this.message
          }).then(resp => {
            this.channel_messages.push(resp.data);
            this.message = '';
            // console.log(resp);
          }).catch(err => {
            console.error(err);
          })
        }
      },
      getMembers(){
        this.$axios.get('members').then(resp => {
          this.$store.commit('setMembers', resp.data);
        }).catch(err => {
          console.error(err);
        });
      },
      getMemberById(member_id){
        return this.$store.getters.members.find(m => {
          return m._id === member_id;
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .content-wrapper{
    .channel{
      position: relative;
      bottom: 0;
      top: 0;
      left: 0;
      padding-bottom: 50px;

      ul{
        margin: 0;

        small{
          color: #b5b5b5;
          font-size: 12px;
        }
      }
    }
    .add-msg{
      position: fixed;
      bottom: 0px;
      right: 0;
      left: 0;
      height: 50px;
      background-color: #cdcdcd;
    }
  }

</style>