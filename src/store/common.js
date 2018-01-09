export default {
  namespaced: true,
  state: {
    userInfo: {},
    toKen: '',
    promotion:{}
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
    }
  },
  actions: {},
  getters: {
    uuId(state, getters) {
      return state.userInfo.uuid
    }
  }
}
