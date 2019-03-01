import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storageManager from "./plugins/storageManager";
import BootstrapVue from 'bootstrap-vue'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(storageManager);

Vue.prototype.$axios = axios.create({ baseURL: 'http://coop.api.netlor.fr/api', params : {
    token : store.state.token
  }, headers: {
    Authorization: 'Token token=f2c5d1bd9d7a4a70a23e4650245df658'
  }});

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
