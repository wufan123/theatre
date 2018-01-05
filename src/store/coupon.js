export default {
  namespaced: true,
  state: {
    coupon:{},
    selectedCoupon:{},
    goodsCouponList: [],
    ticketCouponList: []
  },
  mutations: {
    setCoupon(state,c){
      state.coupon =c;
    },
    setSelectedCoupon(state,coupon){
      state.selectedCoupon =coupon;
    },
    setGoodsCouponList(state, list) {
      state.goodsCouponList = list
    },
    setTicketCouponList(state, list) {
      state.ticketCouponList = list
    }

  },
  actions: {

  },
  getters: {

  }
}
