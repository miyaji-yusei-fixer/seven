import Vue from 'vue'
import VueRouter from 'vue-router'
import PlayGame from '@/pages/PlayGame.vue'
import Tutorial from '@/pages/Tutorial.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PlayGame
  },
  {
    path: '/about',
    name: 'about',
    // こういう書き方もあるって意味で書き方を揃えてないよ
    component: () => import(/* webpackChunkName: "about" */ '@/pages/AboutView.vue')
  },
  {
    path: '/tutorial',
    name: 'tutorial',
    component: Tutorial
  },
]

const router = new VueRouter({
  /* これを入れることでURLから#が消える
  参考：https://code-schools.com/vue-router-sharp-remove/
  */
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? '/seven/' : './',
  routes
})

export default router
