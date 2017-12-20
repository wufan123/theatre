import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/index.vue'
import Me from '@/views/me/index.vue'
import MemberCard from '@/views/me/member/memberCard.vue'
import AddCard from '@/views/me/member/addCard.vue'
import Test from '@/views/test.vue'
import CouponList from '@/views/me/coupon/list.vue'
import FlashSale from 'views/home/flashSale.vue'
import Hermes from 'views/home/hermes.vue'
// import Test from '@/views/components/page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/Me', name: 'Me', component: Me},
    { path: '/Test', name: 'Test', component: Test},
    { path: '/MemberCard', name: 'MemberCard', component: MemberCard},
    { path: '/AddCard', name: 'AddCard', component: AddCard},
    { path: '/CouponList', name: 'CouponList', component: CouponList},
    { path: '/FlashSale', name: 'FlashSale', component: FlashSale},
    { path: '/Hermes', name: 'Hermes', component: Hermes},
  ]
})
