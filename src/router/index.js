import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import BeerTable from '@/components/BeerTable'
import Random from '@/components/Random'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/table',
      name: 'table',
      component: BeerTable, 
    },
    {
      path: '/random',
      name: 'random',
      component: Random
    },
    {
      path: '/beer/:id',
      name: 'detail',
      component: Home
    }
  ]
})