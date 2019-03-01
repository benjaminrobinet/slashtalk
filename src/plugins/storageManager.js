import store from "../store";
import axios from "axios";

let storeManager = { install: function (Vue) {
      store.commit('initStorage');

      store.subscribe((mutation, state) => {
        localStorage.setItem('storage', JSON.stringify(state));

        Vue.prototype.$axios = axios.create({ baseURL: 'http://coop.api.netlor.fr/api', params : {
            token : state.token
          }, headers: {
            Authorization: 'Token token=f2c5d1bd9d7a4a70a23e4650245df658'
          }});
      });
  }
};

export default storeManager;