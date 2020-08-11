import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// routes for our components
const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
