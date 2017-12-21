export default {
    namespaced: true,
    state: {
        userInfo: {},
        login: {},
    },
    mutations: {
        setUserInfo(state, info) {
            state.userInfo = info
        },
        setLoginInfo(state, info) {
            state.login = info
        }
    },
    actions: {},
    getters: {
        uuId(state, getters) {
            return state.userInfo.uuid
        }
    }
}