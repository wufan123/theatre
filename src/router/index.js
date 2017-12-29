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
import IntroduceList from 'views/business/introduce/list.vue'
import IntroduceDetail from 'views/business/introduce/detail.vue'
import SessionDetail from 'views/session/detail.vue'
import FindList from 'views/business/find/list.vue'
import ConfirmOrder from 'views/common/confirmOrder.vue'
import ConfirmGoodOrder from 'views/common/confirmGoodOrder.vue'
import PayOrder from 'views/common/payOrder.vue'
import PaySuccess from 'views/common/paySuccess.vue'
import Snack from 'views/common/snack.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //home
    {path: '*', redirect: '/Home'},
    {path: '/Home', name: 'Home', component: Home},
    {path: '/FlashSale', name: 'FlashSale', component: FlashSale},
    {path: '/LocalProduct', name: 'LocalProduct', component: LocalProduct, props: true},
    {path: '/ProductDetail', name: 'ProductDetail', component: ProductDetail, props: true},
    //business
    {path: '/IntroduceList', name: 'IntroduceList', component: IntroduceList},
    {path: '/IntroduceDetail', name: 'IntroduceDetail', component: IntroduceDetail},
    {path: '/FindList', name: 'FindList', component: FindList},
    //common
    {path: '/ConfirmOrder', name: 'ConfirmOrder', component: ConfirmOrder},
    {path: '/ConfirmGoodOrder', name: 'ConfirmGoodOrder', component: ConfirmGoodOrder,props: true},
    {path: '/Snack', name: 'Snack', component: Snack},
    {path: '/PayOrder', name: 'PayOrder', component: PayOrder},
    {path: '/PaySuccess', name: 'PaySuccess', component: PaySuccess},
    //me
    {path: '/Me', name: 'Me', component: Me},
    {path: '/MemberCard', name: 'MemberCard', component: MemberCard},
    {path: '/AddCard', name: 'AddCard', component: AddCard},
    {path: '/CouponList', name: 'CouponList', component: CouponList},
    {path: '/TicketList', name: 'TicketList', component: TicketList},
    {path: '/TicketDetail', name: 'TicketDetail', component: TicketDetail},
    {path: '/Test', name: 'Test', component: Test},
    {path: '/SessionDetail', name: 'SessionDetail', component: SessionDetail},
    {path: '/Login', name: 'Login', component: Login},
    {path: '/Test', name: 'Test', component: Test}
  ]
})
