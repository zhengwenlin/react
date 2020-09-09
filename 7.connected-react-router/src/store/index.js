import { createStore, applyMiddleware } from 'redux'
import {routerMiddleware} from 'connected-react-router'
import history from './history'
import reducers from './reducers'
// routerMiddleware是一个函数，接收history，返回一个中间件
let store = applyMiddleware(routerMiddleware(history))(createStore)(reducers)
window.store = store;
export default store;