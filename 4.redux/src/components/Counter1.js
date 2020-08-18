import React from 'react'
import store from '../store'
import { bindActionCreators } from '../redux'
import { add, minus } from '../store/actions/counter1'

// 使用bindActionCreators绑定actionCreator和dispatch
let actions = { add, minus }
let bindedActions = bindActionCreators(actions, store.dispatch)
console.log(bindedActions, '**')
export default function Counter1() {
  console.log(store.getState(), 'store.getState()')
    let [state, setNumber] = React.useState({ number: store.getState().reducer1.number })

    // 订阅：
    React.useEffect(() => {
        store.subscribe(() => {
            setNumber({ number: store.getState().reducer1.number })
        })
    }, [])
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={bindedActions.add}>+</button>
            <button onClick={bindedActions.minus}>-</button>
        </div>
    )
}