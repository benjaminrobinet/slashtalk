import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    member: null,
    members: null,
  },
  mutations: {
    setToken(state, token){
      state.token = token;
    },
    setMember(state, member){
      state.member = member;
    },
    setMembers(state, members){
      state.members = members
    },
    initStorage(state){
      if(localStorage.getItem('storage')){
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('storage'))));
      }
    }
  },
  actions: {},
  getters: {
    member: (state) => {
      return state.member;
    },
    token: (state) => {
      return state.token;
    },
    members: (state) => {
      return state.members;
    }
  }
})
