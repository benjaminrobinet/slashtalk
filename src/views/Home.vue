<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <div class="w-25">
          <b-nav vertical>
            <b-nav-item v-for="channel in channels">{{ channel }}</b-nav-item>
            <b-nav-item>Create channel</b-nav-item>
          </b-nav>
        </div>
        <div class="content w-75">
          test
        </div>
      </b-row>
    </b-container>
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
      showCreateChannelModal: false
    }
  },
  mounted(){
    this.$axios.get('channels').then(resp => {
      this.channels = resp.data;
    }).catch(err => {
      console.error(err);
    });
  }
}
</script>
