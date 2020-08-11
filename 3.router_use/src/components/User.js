import React from 'react'
import UserList from './UserList'
import UserAdd from './UserAdd'
import UserDetial from './UserDetial'
import { Route, Link } from '../react-router-dom'

export default class extends React.Component {
    render(){
        return (
            <div>
                <p><Link to="/user/add">添加用户</Link></p>
                <p><Link to="/user/list">用户列表</Link></p>
                <div>
                    <Route path="/user/add" component={UserAdd} />
                    <Route path="/user/list" component={UserList} />
                    <Route path="/user/detial/:id" component={UserDetial} />
                </div>
            </div>
        )
    }
}