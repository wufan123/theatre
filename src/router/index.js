import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Test from '@/views/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    }
  ]
})
