export default {
    namespaced: true,
    state: {
        payLockInfo:{},
        selectedMember:{},
    },
    mutations: {
        setPayLockInfo(state,info){
          state.payLockInfo =info ;
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
