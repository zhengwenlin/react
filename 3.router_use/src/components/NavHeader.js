import React from 'react'
import {withRouter} from '../react-router-dom'
function NavHeader(props) {
    let {title} = props
    console.log(props, 'NavHeaderProps**')

    function handleClick(){
        props.history.push('/user/list')
    }
    return (
        <h2 onClick={handleClick}>{title}</h2>
    )
}


export default withRouter(NavHeader)