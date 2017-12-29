import {merge} from '../util'
import objectPath from 'object-path'

const reducer = (state, paths) => (
  paths.length === 0 ? state : paths.reduce((substate, path) => {
    objectPath.set(substate, path, objectPath.get(state, path))
    return substate
  }, {})
)

function createPersistedState({
                                key = 'vuex',
                                paths = [],
                                getState = key => JSON.parse(window.localStorage.getItem(key)),
                                setState = (key, state) => window.localStorage.setItem(key, JSON.stringify(state)),
                              }) {
  return store => {
    //获取浏览器类型
    let _state = getState(key)
    // if (_state && _state.common && _state.common.version != store.state.common.version) {
    //     console.log('----localStorage clear-----:current ver:' + store.state.common.version + '--:old ver:' + _state.common.version)
    //     window.localStorage.removeItem(key)
    // } else {
    try {
      store.replaceState(
        merge(store.state, _state)
      )
    } catch (error) {
      window.localStorage.removeItem(key)
      // console.log(error)
    }
    // }
    store.subscribe((mutation, state) => {
      setState(key, reducer(state, paths))
    })
  }
}

export {
  createPersistedState
}
