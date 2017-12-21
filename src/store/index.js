import common from './common'
import Vue from 'vue'
import { createPersistedState } from './plugin'
import business from './business'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common: common,
        business: business
    },
    plugins: [
        createPersistedState({ //长期存储关键数据
            paths: [
                'common'
            ]
        }),
        createPersistedState({ //会话存储避免刷新丢失数据
            getState: key => JSON.parse(window.sessionStorage.getItem(key)),
            setState: (key, state) => window.sessionStorage.setItem(key, JSON.stringify(state)),
        })
    ]
})