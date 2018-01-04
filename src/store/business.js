export default {
    namespaced: true,
    state: {
        payLockInfo:{},
        selectedCoupon:{},
        selectedMember:{},
    },
    mutations: {
        setPayLockInfo(state,info){
          state.payLockInfo =info ;
        },
        setSelectedCoupon(state,coupon){
          state.selectedCoupon =coupon ;
        },
        setSelectedMember(state,member){
          state.selectedMember =member ;
        }
    },
    actions: {

    },
    getters: {

    }
}
