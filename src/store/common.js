export default {
    namespaced: true,
    state: {
        userInfo: {},
        login: {},
        toKen:'',
    },
    mutations: {
        setUserInfo(state, info) {
            state.userInfo = info
        },
        setLoginInfo(state, info) {
            state.login = info
        },
        setToken(state,t){
          state.token =t;
        }
    },
    actions: {},
    getters: {
        uuId(state, getters) {
            return state.userInfo.uuid
        }
    }
}
