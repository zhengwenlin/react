
import ActionTypes from './utils/ActionTypes'

/**
 * 创建store的方法
 * @param {Funciton} reducer 处理器函数
 * @param {*} preloadState 初始状态
 */
function createStore(reducer, preloadState) {
    let currentReducer = reducer;
    let currentPrevloadState = preloadState;
    let listeners = []
    function getState() {
        return currentPrevloadState
    }

    function subscribe(listener) {
        listeners.push(listener)

        return function () {
            listeners = listeners.filter(item => item !== listener)
        }
    }

    function dispatch(action) {
        currentPrevloadState = currentReducer(currentPrevloadState, action)
        listeners.forEach(l => l())
        return action;
    }
    //默认创建store的时候，触发一次dispatch方法，初始化action
    dispatch({type: ActionTypes.INIT});
    return {
        getState,
        subscribe,
        dispatch
    }
}

export default createStore