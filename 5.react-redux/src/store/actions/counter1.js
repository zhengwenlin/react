// actionCreator依赖antion对象
import * as actionTypes from '../action-types'
export function add() {
  return { type: actionTypes.ADD }
}

export function minus() {
  return { type: actionTypes.MINUS }
}

export default {
  add() {
    return { type: actionTypes.ADD }
  },
  minus() {
    return { type: actionTypes.MINUS }
  }
}