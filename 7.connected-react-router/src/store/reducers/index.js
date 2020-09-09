import {combineReducers} from 'redux'
import counter from './counter'
import {connectRouter} from 'connected-react-router'
import history from '../history'
let reduces = {
  counter,
  router: connectRouter(history)
}

let combinedReducers = combineReducers(reduces)

export default combinedReducers