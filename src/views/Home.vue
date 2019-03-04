<template>
  <div class="home" v-if="loggedIn">
    <b-container fluid>
      <b-row>
        <div class="w-25 topic-nav">
          <b-nav vertical>
            <b-nav-item class="create" v-if="loggedIn" @click="showCreateChannelModal = !showCreateChannelModal"><font-awesome-icon icon="plus"/> Create channel</b-nav-item>
            <b-nav-item v-for="channel in channels" :key="channel._id" :class="{active : channel === currentChannel}" @click="openChannel(channel)"><span class="channel-name" v-b-tooltip.right :title="channel.topic">{{ channel.label }}</span></b-nav-item>
          </b-nav>
        </div>
        <div class="content w-75">
          <Channel v-if="currentChannel !== null" :channel="currentChannel"/>
        </div>
      </b-row>
    </b-container>
    <b-modal hide-footer title="Create new channel" v-model="showCreateChannelModal">
      <b-form @submit.prevent="createChannel">
        <b-form-group label="Label" label-for="label">
          <b-form-input
              id="label"
              type="text"
              v-model="form.label"
              required
              placeholder="Enter channel label" />
        </b-form-group>

        <b-form-group label="Topic" label-for="topic">
          <b-form-input
              id="topic"
              type="text"
              v-model="form.topic"
              required
              placeholder="Enter channel topic" />
        </b-form-group>

        <b-button type="submit" variant="primary">Create</b-button>
      </b-form>
    </b-modal>
  </div>
  <div v-else>
    <b-container>
      You have to be logged in to access this page.
    </b-container>
  </div>
</template>

<script>

import Channel from "../components/Channel";

export default {
  name: 'home',
  components: {
    Channel
  },
  data(){
    return {
      channels: [],
      showCreateChannelModal: false,
      form: {
        label: '',
        topic: ''
      },
      currentChannel: null,
    }
  },
  mounted(){
    if(this.loggedIn){
      this.getChannels();
    }
  },
  methods:{
    getChannels(){
      this.$axios.get('channels').then(resp => {
        this.channels = resp.data;
        if(this.currentChannel === null){
          this.currentChannel = this.channels[0];
        }
      }).catch(err => {
        console.error(err);
      });
    },
    createChannel(){
      this.$axios.post('channels', {
        "label": this.form.label,
        "topic": this.form.topic
      }).then(resp => {
        this.getChannels();
        this.form.label = this.form.topic = '';
        this.showCreateChannelModal = false;
      }).catch(err => {
        console.error(err);
      })
    },
    openChannel(channel){
      this.currentChannel = channel;
    }
  },
  computed:{
    loggedIn(){
      return this.$store.getters.member !== null
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    .topic-nav{
      padding-bottom: 50px;

      .active{
        font-weight: bold;
      }
    }
    .create{
      a{
        font-weight: bold;
      }
    }
    .channel-name{
      padding-right: 10px;
    }
  }
</style>
