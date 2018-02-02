export default {
    namespaced: true,
    state: {
        payLockInfo:{},
        memberList:[],
        selectedMember:{},
        selectPackageOrder:{},
        selectTicketOrder:{}
    },
    mutations: {
        setPayLockInfo(state,info){
          state.payLockInfo =info ;
        },
        setMemberList(state,list){
          state.memberList = list
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
