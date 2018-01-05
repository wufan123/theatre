export default {
    namespaced: true,
    state: {
        payLockInfo:{},
        selectedCoupon:{},
        selectedMember:{},
        selectPackageOrder:{},
        selectTicketOrder:{}
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
        },
        setSelectedPackageOrder(state,order){
          state.selectPackageOrder = order ;
        },
        setSelectedTicketOrder(state,order){
          state.selectTicketOrder = order ;
        },
    },
    actions: {

    },
    getters: {

    }
}
