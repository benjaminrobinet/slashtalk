import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import storageManager from "./plugins/storageManager";
import BootstrapVue from 'bootstrap-vue'
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import * as vueMoment from 'vue-moment'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(vueMoment);

Vue.use(storageManager);


Vue.prototype.$axios = axios.create({ baseURL: 'http://coop.api.netlor.fr/api', params : {
    token : store.getters.token
  }, headers: {
    Authorization: 'Token token=f2c5d1bd9d7a4a70a23e4650245df658'
  }});

library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
