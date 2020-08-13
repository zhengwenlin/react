import React from 'react'
import { User } from '../utils'
import { Prompt } from '../react-router-dom'

export default class userAdd extends React.Component {
    state = { isblocking: false }
    ref = React.createRef()
    handleClck() {
        this.setState({ isblocking: false }, () => {
            let value = this.ref.current.value
            User.add({
                id: new Date().getTime(),
                name: value
            })
            this.props.history.push('/user/list')
        })
    }
    render() {

        return (
            <div>
                <Prompt
                    when={this.state.isblocking}
                    message={location => `确定跳转到${location.pathname}去吗？`}
                />
                <input ref={this.ref} onChange={(e) => this.setState({ isblocking: e.target.value.length > 0 })} />
                <button onClick={() => this.handleClck()}>ADD</button>
            </div>
        )
    }
}