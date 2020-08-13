import React from 'react' 
import {User} from '../utils'
export default class UserDetial extends React.Component {
    state = {user:{}}
    render() {
        console.log(this.props, '***')
        let {location, history, matched} = this.props
        if(location.state && location.state.user){
            this.state.user = location.state.user
        }
        if(!this.state.user){
            this.state.user = User.find(matched.params.id)
        }
        return (
        <div>{this.state.user.id} : {this.state.user.name} </div>
        )
    }
}