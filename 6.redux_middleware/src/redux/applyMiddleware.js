
import compose from './compose'
export default function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer)
            // 中间件执行返回重写后的dispatch方法
            let dispatch;
            let middlewareAPI = { getState: store.getState, dispatch: action => dispatch(action) }
            let chain = middlewares.map(m => m(middlewareAPI))
            // dispatch = middlewares(middlewareAPI)(store.dispatch)
            dispatch = compose(...chain)(store.dispatch)
            return { ...store, dispatch }
        }
    }
}