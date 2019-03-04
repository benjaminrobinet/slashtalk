<template>
  <div class="content-wrapper">
    <div class="channel">
      {{ channel.label }} <br/>
      {{ channel.topic }}
    </div>
    <div class="add-msg d-flex align-items-center">
      <div class="container">
        <b-form inline>
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-input-group-text slot="prepend"><font-awesome-icon icon="envelope"/></b-input-group-text>
            <b-input id="inlineFormInputGroupUsername2" placeholder="Username" />
          </b-input-group>
          <b-button variant="primary">Send</b-button>
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
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .content-wrapper{
    .add-msg{
      position: absolute;
      bottom: 0px;
      right: 0;
      left: 0;
      height: 50px;
      background-color: #2e2e2e;
    }
  }

</style>