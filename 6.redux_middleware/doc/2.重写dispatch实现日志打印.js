import { createStore, combineReducers } from 'redux'
import reducer1 from './reducers/counter1'
import reducer2 from './reducers/counter2'
let reducers = {reducer1, reducer2}
let combinedReducer = combineReducers(reducers)
let store = createStore(combinedReducer)

/*
  redux中间件
   1. 就是对dispatch方法的劫持重写
*/ 
// 用户在页面中调用dispatch方法的时候，就是调用的重写后的方法
let oldDispatch = store.dispatch;
store.dispatch = function (action) {
    console.log('旧状态：', store.getState())
    setTimeout(() => {
        oldDispatch(action)
        console.log('新状态：', store.getState())
    }, 2000)
    return action
}
export default store;