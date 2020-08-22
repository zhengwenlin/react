import { createStore, combineReducers } from 'redux'
import reducer1 from './reducers/counter1'
import reducer2 from './reducers/counter2'
let reducers = { reducer1, reducer2 }
let combinedReducer = combineReducers(reducers)

function applyMiddleware (middleware) {
    console.log('my')
    return function (createStore) {
        return function (reducers) {
            let store = createStore(reducers)
            const middlewareAPI = {getState: store.getState, dispatch: store.dispatch}
            // 得到一个funtion(action){}参数是action的函数，很像dispatch方法dispatch(action)
            store.dispatch = middleware(middlewareAPI)(store.dispatch) 
            return store
        }
    }
}
// 日志中间件
function logger(middlewareAPI) {
    return function (next) {
        return function (action) {
            console.log(middlewareAPI.getState());
            next(action);
            console.log(middlewareAPI.getState());
            return action;
        }
    }
}
let store = applyMiddleware(logger)(createStore)(combinedReducer)
/**
 * 箭头函数写法：
 * let logger = (middlewareAPI) => (next) => (action) => {
    console.log(middlewareAPI.getState());
    next(action);
    console.log(middlewareAPI.getState());
    return action;
};
 */
// let storeEnhancer = applyMiddleware(logger);
// let storeEnhancerStoreCreator = storeEnhancer(createStore);
// let store = storeEnhancerStoreCreator(combinedReducer);

export default store;