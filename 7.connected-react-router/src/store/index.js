import { createStore, applyMiddleware } from 'redux'
import reducers from './reducers'
let store = applyMiddleware()(createStore)(reducers)

export default store;