import ReactReduxContext from '../Context'
import React from 'react'

export default function useReduxContext() {
    let context = React.useContext(ReactReduxContext)
    return context;
}