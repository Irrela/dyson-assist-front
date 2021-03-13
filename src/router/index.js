import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import AppIndex from '../components/home/AppIndex'
import CalculatorIndex from '../components/calculator/CalculatorIndex'
import SeedsIndex from '../components/seeds/SeedsIndex.vue'
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/',
      name: 'Default',
      component: Home,
      redirect: '/home'
    },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/calculator',
          name: 'CalculatorIndex',
          component: CalculatorIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/seeds',
          name: 'SeedsIndex',
          component: SeedsIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    }
  ]
})
