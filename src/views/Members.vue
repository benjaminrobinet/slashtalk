<template>
  <div class="members">
    <ul>
      <li v-for=""></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'members',
  mounted(){
    this.$axios.get('members').then(resp => {
      console.log(resp.data);
    }).catch(err => {
      console.error(err);
    });
  }

}
</script>
