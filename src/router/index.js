import Vue from 'vue'
import VueRouter from 'vue-router'
import PlayGame from '@/views/HomeView.vue'
import Tutorial from '@/views/TutorealView.vue'

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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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
