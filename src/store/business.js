export default {
    namespaced: true,
    state: {
        payLockInfo:{},
        selectedMember:{},
        selectPackageOrder:{},
        selectTicketOrder:{}
    },
    mutations: {
        setPayLockInfo(state,info){
          state.payLockInfo =info ;
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
