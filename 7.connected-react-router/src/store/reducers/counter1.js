
import * as actionTypes from '../action-types'
let initalState = { number: 0 }
export function reducer(state = initalState, action) {
    switch (action.type) {
        case actionTypes.ADD1:
            return { number: state.number + 1 }
        case actionTypes.MINUS1:
            return { number: state.number - 1 }
        default:
            return state;
    }
}