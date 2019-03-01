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
          <b-button variant="danger">Delete</b-button>
        </div>
      </div>
    </div>
    <b-modal v-model="showModal" hide-footer :id="member._id" :title="member.fullname">
      <b-card>
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button @click="showModal = !showModal" variant="primary">Close</b-button>
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
      showModal: false,
    }
  },
  mounted() {
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
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
