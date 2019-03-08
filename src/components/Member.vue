<template>
  <div class="member-container">
    <div class="member">
      <div class="content">
        <div class="title">{{ member.fullname }}</div>
        <small>{{ member.email }}</small>
      </div>
      <div class="buttons">
        <div>
          <b-button variant="primary" @click="showModal = !showModal">Show</b-button>
        </div>
        <div v-if="member._id !== me._id">
          <b-button variant="danger" @click="deleteMember(member)">Delete</b-button>
        </div>
      </div>
    </div>
    <b-modal v-model="showModal" hide-footer :id="member._id" :title="member.fullname" class="member-info">
      <b-card>
        <b-card-text>
          <div>
            <font-awesome-icon icon="user" /> {{ member.fullname }} <span class="id">({{ member._id }})</span>
          </div>
          <div>
            <font-awesome-icon icon="envelope" /> {{ member.email }}
          </div>
          <b-card :header="last10Messages.length + ' last messages'" class="mt-3">
            <b-list-group>
              <b-list-group-item @click="showInChannel(last_msg)" v-for="last_msg in last10Messages" :key="last_msg._id" href="#">{{ last_msg.message }}</b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-text>
        <div class="buttons">
          <b-button @click="showModal = !showModal" variant="primary">Close</b-button>
        </div>
      </b-card>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'Member',
  props: {
    member: Object
  },
  data(){
    return {
      me: this.$store.getters.member,
      lastMessages: [],
      showModal: false,
    }
  },
  watch:{
    member: function(){

    },
    showModal: function(){
      if(this.showModal){
        this.getMessages();
      }
    }
  },
  mounted() {
    console.log(this.me);
  },
  computed: {
    last10Messages(){
      return this.lastMessages.concat().sort(function(a,b){
          return new Date(b.updated_at) - new Date(a.updated_at);
        }).slice(0, 10);
    }
  },
  methods: {
    getMessages(){
      this.lastMessages = [];
      this.$axios.get('channels').then(resp => {
        let channels = resp.data;
        channels.forEach(channel => {
          this.$axios.get('channels/' + channel._id + '/posts').then(resp => {
            let posts = resp.data;
            posts.forEach(post => {
              if(post.member_id === this.member._id){
                this.lastMessages.push(post);
              }
            });
          }).catch(err => {
            console.error(err)
          });
        });

        // When all loops are done
      }).catch(err => {
        console.error(err);
      });
    },
    showInChannel(msg){
      this.$router.push({name: 'home', params: {
        'channelId': msg.channel_id,
        'focusedMessageId': msg._id
      }});
    },
    deleteMember(member){
      this.$axios.delete('members');
    }
  }
}
</script>

<style scoped lang="scss">
  .member{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    div.title{
      font-size: 16px;
      text-transform: capitalize;
      font-weight: bold;
    }
    small{
      color: #2e2e2e;
    }

    div.buttons{
      div{
        display: inline-block;
      }
      div + div{
        margin-left: 5px;
      }
    }
  }

  .member-info{
    span.id{
      font-style: italic;
      color: #6c6c6c;
      font-size: 14px;
    }

    .buttons{
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
