import Vue from "vue"
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import App from "./App.vue"
import axios from "axios"
import VueAxios from "vue-axios"
import router from "./router"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app")
