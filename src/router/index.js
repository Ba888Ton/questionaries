import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/questionary',
    name: 'Questionary',
    component: () => import('../views/Questionary.vue')
  },
  {
    path: '/configurator',
    name: 'Configurator',
    component: () => import('../views/Configurator.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
