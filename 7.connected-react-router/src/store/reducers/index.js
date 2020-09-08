import {combineReducers} from 'redux'
import counter from './counter'

let reduces = {
  counter
}

let combinedReducers = combineReducers(reduces)

export default combinedReducers