import React from 'react'
import store from '../store'
import { bindActionCreators } from 'redux'
import { add2, minus2 } from '../store/actions/counter2'

// 使用bindActionCreators绑定actionCreator和dispatch
let actions = { add2, minus2 }
let bindedActions = bindActionCreators(actions, store.dispatch)
export default function Counter2() {
    let [state, setNumber] = React.useState({ number: store.getState().reducer2.number })

    // 订阅：
    React.useEffect(() => {
        store.subscribe(() => {
            setNumber({ number: store.getState().reducer2.number })
        })
    }, [])
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={ bindedActions.add2}>+</button>
            <button onClick={bindedActions.minus2}>-</button>
        </div>
    )
}