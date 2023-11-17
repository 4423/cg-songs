import Vue from 'vue'
import Router from 'vue-router'
import Setlist from './components/Setlist.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'setlist',
      component: Setlist
    }
  ]
})