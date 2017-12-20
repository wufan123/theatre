import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/index.vue'
import Me from '@/views/me/index.vue'
import MemberCard from '@/views/me/member/memberCard.vue'
import AddCard from '@/views/me/member/addCard.vue'
import Login from '@/views/login/index.vue'
import Test from '@/views/test.vue'
import CouponList from '@/views/me/coupon/list.vue'
import TicketList from '@/views/me/ticket/list.vue'
import TicketDetail from '@/views/me/ticket/ticketDetail.vue'
import FlashSale from 'views/home/flashSale.vue'
import LocalProduct from 'views/home/localProduct.vue'
import ProductDetail from 'views/home/productDetail.vue'

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
    { path: '/LocalProduct', name: 'LocalProduct', component: LocalProduct,props: true},
    { path: '/ProductDetail', name: 'ProductDetail', component: ProductDetail,props: true},
    { path: '/Login', name: 'Login', component: Login},
    { path: '/CouponList', name: 'CouponList', component: CouponList},
    { path: '/TicketList', name: 'TicketList', component: TicketList},
    { path: '/TicketDetail', name: 'TicketDetail', component: TicketDetail}
  ]
})
