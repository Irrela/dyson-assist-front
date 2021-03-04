import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
// import Login from '../components/Login'
import Home from '../components/Home'
import CalculatorIndex from '../components/calculator/CalculatorIndex'
import SeedsIndex from '../components/seeds/SeedsIndex.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
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
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/',
      name: 'Index',
      redirect: '/index'
    }
  ]
})
