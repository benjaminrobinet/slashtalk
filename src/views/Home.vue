<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <div class="w-25">
          <b-nav vertical>
            <b-nav-item class="create" @click="showCreateChannelModal = !showCreateChannelModal"><font-awesome-icon icon="plus"/> Create channel</b-nav-item>
            <b-nav-item v-for="channel in channels" v-b-tooltip.right :title="channel.topic">{{ channel.label }}</b-nav-item>
          </b-nav>
        </div>
        <div class="content w-75">
          test
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
</template>

<script>

export default {
  name: 'home',
  components: {
  },
  data(){
    return {
      channels: [],
      showCreateChannelModal: false,
      form: {
        label: '',
        topic: ''
      }
    }
  },
  mounted(){
    this.getChannels();
  },
  methods:{
    getChannels(){
      this.$axios.get('channels').then(resp => {
        this.channels = resp.data;
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
    }
  }
}
</script>

<style scoped lang="scss">
  .home{
    .create{
      a{
        font-weight: bold;
      }
    }
  }
</style>
