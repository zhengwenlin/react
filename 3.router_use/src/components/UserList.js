import React from 'react'
import { User } from '../utils'
export default class extends React.Component {
    handleClick(user){
        let {id} = user
        this.props.history.push(`/user/detial/${id}`, {user})
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        User.getList().map(user => <li onClick={() => this.handleClick(user)} key={user.id}>{user.name}</li>)
                    }
                </ul>
            </div>
        )
    }
}