export default {
  namespaced: true,
  state: {
    userInfo: {},
    toKen: '',
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
    },
    setToken(state, t){
      state.token = t;
    }
  },
  actions: {},
  getters: {
    uuId(state, getters) {
      return state.userInfo.uuid
    }
  }
}
