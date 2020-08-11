import React from 'react'
import { User } from '../utils'
export default function UserAdd (props) {
    let ref = React.createRef()
    function handleClck(e){
        User.add({
            id: new Date().getTime(),
            name: ref.current.value
        })
        props.history.push('/user/list')
    }
    
    return (
        <div>
            <input ref={ref} />
            <button onClick={() => handleClck()}>ADD</button>
        </div>
    )
}