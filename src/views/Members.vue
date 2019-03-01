<template>
  <b-container>
    <div class="members">
      <b-list-group>
        <b-list-group-item v-for="member in members" :key="member._id">
          <Member :member="member"/>
        </b-list-group-item>
      </b-list-group>
    </div>
  </b-container>
</template>

<script>

import Member from "../components/Member";
export default {
  name: 'members',
  components: {Member},
  data(){
    return {
      members: []
    }
  },
  mounted(){
    this.$axios.get('members').then(resp => {
      this.members = resp.data;
      // console.log(resp);
    }).catch(err => {
      console.error(err);
    });
  }

}
</script>

<style scoped lang="scss">
  .members{
  }
</style>
