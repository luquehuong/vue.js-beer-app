import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import RandomBeer from '@/components/RandomBeer'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/random',
      name: 'random',
      component: RandomBeer
    },
    {
      path: '/beer/:id',
      name: 'detail',
      component: Home
    }
  ]
})