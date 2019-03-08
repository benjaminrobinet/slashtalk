<template>
  <div class="content-wrapper">
    <div class="channel">
      <ul>
        <b-media tag="li" :class="{focused : msg === focused_message}" v-for="msg in orderedMessages" :key="msg._id">
          <b-img slot="aside" blank blank-color="#e2e2e2" width="64" alt="placeholder" />

          <div>
            <h5 class="mt-0 mb-1">{{ getMemberById(msg.member_id).fullname }} <small>{{ msg.updated_at | moment("calendar") }}</small> </h5>
            <div v-if="editing === msg">
              <b-form inline @submit.prevent="saveMessage(msg)">
                <label class="sr-only" for="message_edit">Message Edit</label>
                <b-input class="mb-2 mr-sm-2 mb-sm-0" id="message_edit" v-model="msg.message" :value="msg.message" />
                <b-button variant="primary" @click="saveMessage(msg)">Save</b-button>
              </b-form>
            </div>
            <div v-else>
              <p class="mb-0">
                {{ msg.message }}
              </p>
            </div>
          </div>
          <div class="actions d-flex justify-content-end flex-nowrap ">
            <div class="edit" @click="toggleEdit(msg)"><font-awesome-icon icon="edit"/></div>
            <div class="delete" @click="removeMessage(msg)"><font-awesome-icon icon="times"/></div>
          </div>
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
      'channel': Object,
      'focusedMessageId': String,
    },
    data(){
      return {
        message: '',
        channel_messages: [],
        editing: null,
        focused_message: null,
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
          if(this.focusedMessageId !== null){
            this.focused_message = this.channel_messages.find(m => m._id === this.focusedMessageId);
          }
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
      },
      toggleEdit(message){
        this.editing = message;
      },
      removeMessage(message){
        this.$axios.delete('channels/' + this.channel._id + '/posts/' + message._id, message).then(resp => {
          let _messageIndex = this.orderedMessages.findIndex(obj => obj._id === message._id);
          console.log(_messageIndex);
          this.channel_messages.splice(_messageIndex, 1);
        }).catch(err => {
          console.error(err);
        });
      },
      saveMessage(message){
        this.$axios.put('channels/' + this.channel._id + '/posts/' + message._id, message).then(resp => {
          this.editing = null;
        }).catch(err => {
          console.error(err);
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

        li{
          transition: background-color 0.05s linear;
          padding-top: 5px;
          padding-left: 5px;

          &.focused{
            animation: focus 1s ease-out;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
          }
        }

        li:hover{
          background-color: rgba(203, 203, 203, 0.1);
        }

        small{
          color: #b5b5b5;
          font-size: 12px;
        }

        .actions{
          margin-top: 10px;
          margin-right: 20px;
          > div {
            cursor: pointer;

            + div {
              margin-left: 10px;
            }

            &:hover{
              svg, i{
                fill: #b5b5b5;
                color: #b5b5b5;
              }
            }

            svg, i{
              transition: all 0.1s linear;
              width: 16px;
              height: 16px;
            }

          }
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
    @keyframes focus {
      from {
        background-color: #007bff;;
      }

      to{
        background-color: rgba(0, 123, 255, 0.16);;
      }
    }
  }

</style>