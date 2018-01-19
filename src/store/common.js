export default {
  namespaced: true,
  state: {
    userInfo: {},
    toKen: '',
    promotion:{},
    openId:''
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
    },
    setToken(state, t){
      state.token = t;
    },
    setPromotion(state,p){
      state.promotion = p;
    },
    setOpenId(state,openId){
      state.openId = openId;
    }
  },
  actions: {},
  getters: {
    uuId(state, getters) {
      return state.userInfo.uuid
    }
  }
}
