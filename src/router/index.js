import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/seven/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/seven/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  /* これを入れることでURLから#が消える
  参考：https://code-schools.com/vue-router-sharp-remove/
  */
  mode: 'history',
  routes
})

export default router
