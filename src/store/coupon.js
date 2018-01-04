export default {
  namespaced: true,
  state: {
    coupon:{},
    useCoupon:[],
    selectedCoupon:{}
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
    }

  },
  actions: {

  },
  getters: {

  }
}
