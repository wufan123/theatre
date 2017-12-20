import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home.vue'
import Me from '@/views/me/index.vue'
import MemberCard from '@/views/me/member/memberCard.vue'
import AddCard from '@/views/me/member/addCard.vue'
import Login from '@/views/login/index.vue'
import Test from '@/views/test.vue'
import CouponList from '@/views/me/coupon/list.vue'
// import Test from '@/views/components/page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/Me', name: 'Me', component: Me},
    { path: '/Test', name: 'Test', component: Test},
    { path: '/MemberCard', name: 'MemberCard', component: MemberCard},
    { path: '/AddCard', name: 'AddCard', component: AddCard},
    { path: '/Login', name: 'Login', component: Login},
    { path: '/couponList', name: 'couponList', component: CouponList}
  ]
})
