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
  const title = "アイドルマスターシンデレラガールズ歌唱曲検索"
  if (to.path == "" || to.path == "/") {
    document.title = title
  }
  else {
    document.title = to.path.split("/").slice(1).join(" ") + " - " + title
  }
})

export default router