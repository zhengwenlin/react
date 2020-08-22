import { createStore, combineReducers, applyMiddleware } from '../redux'
import reducer1 from './reducers/counter1'
import reducer2 from './reducers/counter2'
// 引入中间件
import logger from '../redux-logger'
import promise from '../redux-promise'
import thunk from '../redux-thunk'
let reducers = { reducer1, reducer2 }
let combinedReducer = combineReducers(reducers)


let store = applyMiddleware(promise, thunk, logger)(createStore)(combinedReducer)


export default store;