import * as types from '../action-types'
import { push } from 'connected-react-router'
export default {
  add() {
    return { type: types.ADD }
  },
  minus() {
    return { type: types.MINUS }
  },
  goto(to){
    return push(to)
  }
}