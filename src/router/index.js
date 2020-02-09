import Vue from 'vue'
import Router from 'vue-router'
import Spot from '@/components/Spot'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Spot',
      component: Spot
    }
  ]
})
