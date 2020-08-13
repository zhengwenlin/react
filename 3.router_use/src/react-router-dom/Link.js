import React from 'react'
import RouterContext from '../react-router/routerContext'

export default function Link(props){
    function handleClick(e, context){
        e.preventDefault();
        context.history.push(props.to, null) 
    }
    let style = {
        cursor: 'pointer',
        textDecoration: 'underline',
    }
    return (
        <RouterContext.Consumer>
            {
                context => {
                    return <a style={style} {...props} onClick={(e) => handleClick(e, context)}>{props.children}</a>
                }
            }
        </RouterContext.Consumer>
    )
}
