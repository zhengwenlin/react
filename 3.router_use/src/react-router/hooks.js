import React from 'react'
import RouterContext from './routerContext'

export function useHistory(){
    console.log('my')
    let context = React.useContext(RouterContext)

    return context.history;
}

export function useLocation(){
    console.log('my')
    let context = React.useContext(RouterContext)

    return context.location;
}

export function useParams(){
    console.log('my')
    let context = React.useContext(RouterContext)

    return context.match ? context.match.params : null;
}