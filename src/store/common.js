export default {
  namespaced: true,
  state: {
    userInfo: {},
    toKen: '',
    promotion:{},
    recommendId:'',
    openId:''
  },
  mutations: {
    setUserInfo(state, info) {
      state.userInfo = info
    },
    setRecommendId(state, id){
      console.log('id',id)
      state.recommendId = id
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
