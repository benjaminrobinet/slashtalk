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
    <b-modal v-model="showModal" hide-footer :id="member._id" :title="member.fullname" class="member-info">
      <b-card>
        <b-card-text>
          <div>
            <font-awesome-icon icon="user" /> {{ member.fullname }} <span class="id">({{ member._id }})</span>
          </div>
          <div>
            <font-awesome-icon icon="envelope" /> {{ member.email }}
          </div>
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
