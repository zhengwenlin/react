import * as types from '../action-types'
let initialState = {
  count: 0
}
export default function (state = initialState, action) {
  switch (action.type) {
    case types.ADD:
      return { count: state.count + 1 }
    case types.MINUS:
      return { count: state.count - 1 }
    default:
      return state
  }
}