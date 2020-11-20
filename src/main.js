import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from "./store/store"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(router)

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("getMemberInfo", false)
  },
  render: h => h(App),
}).$mount('#app')
