<template>
  <div class="channel">
    {{ channel.label }} <br/>
    {{ channel.topic }}
  </div>
</template>

<script>
  export default {
    name: "Channel",
    props: {
      'channel': Object
    },
    data(){
      return {}
    }
  }
</script>

<style scoped>

</style>