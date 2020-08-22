import { createStore, combineReducers } from 'redux'
import reducer1 from './reducers/counter1'
import reducer2 from './reducers/counter2'
let reducers = { reducer1, reducer2 }
let combinedReducer = combineReducers(reducers)

function applyMiddleware(middleware) {
    console.log('my')
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer)
            //这里的middlewareAPI的dispatch方法不能是原生的dispatch方法
            // dispatch是一个函数，有参数action dispatch(action)
            let dispatch;
            // 在中间件中，调用middlewareAPI的dispatch方法，实际上就是包装后的dispatch方法，在
            // 包装后的dispatch方法中，调用了重写后的dispatch方法，其实重写后的dispatch方法就是
            // middleware()()执行两次后返回的fuction(action){}方法，此时重新走到了中间件的判断
            // 中去了，判断action 是一个函数，走到函数的判断中，函数中又调用了重写后的dispatch，又
            // 走到了判断中，此时，action是一个type对象，调用next结束这个中间件的执行
            // 这里的dispatch还是undefined，但是不会报错，因为函数没有调用呢
            const middlewareAPI = { getState: store.getState, dispatch: action => dispatch(action) }
            // 得到一个funtion(action){}参数是action的函数，很像dispatch方法dispatch(action)
            dispatch = middleware(middlewareAPI)(store.dispatch)
            return { ...store, dispatch }
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

// redux-thunk
function reduxThunk(middlewareAPI) { // {dispatch,getState} 这个dispatch是重写后的
    let { dispatch, getState } = middlewareAPI
    return function (next) { // next指向下一个中间件或者原生的store.dispatch方法
        return function (action) {
            if (typeof action === 'function') {
                return action(dispatch, getState)
            } else {
                return next(action)
            }
        }
    }
}


// promise
function reduxPromise(middlewareAPI) {
    let { dispatch, getState } = middlewareAPI
    return function (next) {
        return function (action) {
            if (action.then && typeof action.then === 'function') {
                // 这里的dispatch不能是原生的dispatch方法，因为，
                // then的结果res是一个函数，原生是不支持函数的
                // 也就是middlewareAPI的dispatch不能是原生的dispatch
                return action.then(dispatch)
            } else if (typeof action === 'function') {
                return action(dispatch, getState)
            } else {
                return next(action)
            }
        }
    }
}

let store = applyMiddleware(reduxPromise)(createStore)(combinedReducer)
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