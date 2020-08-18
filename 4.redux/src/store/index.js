import { createStore, combineReducers } from 'redux'
import reducer1 from './reducers/counter1'
import reducer2 from './reducers/counter2'
let reducers = {reducer1, reducer2}
let combinedReducer = combineReducers(reducers)
let store = createStore(combinedReducer)

export default store;