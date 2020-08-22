import ReactReduxContext from '../Context'
import React from 'react'

export function useDispatch() {

    let context = React.useContext(ReactReduxContext)

    return context.store;
}