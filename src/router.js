import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home.vue'

Vue.use(Router)
const routes = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
  ],
})
export default routes
