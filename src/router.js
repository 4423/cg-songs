import Vue from 'vue'
import Router from 'vue-router'
import Setlist from './components/Setlist.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'setlist',
      component: Setlist
    }
  ]
})

router.afterEach((to) => {
  document.title = to.path.split("/").slice(1).join(" ") + " - アイドルマスターシンデレラガールズ歌唱曲検索"
})

export default router