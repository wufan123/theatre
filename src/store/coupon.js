export default {
  namespaced: true,
  state: {
    coupon:{},
    useCoupon:[],
    selectedCoupon:{},
    goodsCouponList: [],
    ticketCouponList: []
  },
  mutations: {
    setCoupon(state,c){
      state.coupon =c;
    },
    setUseCoupon(state,list){
      state.useCoupon =list;
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
