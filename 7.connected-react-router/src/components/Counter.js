import React, { useEffect, useState } from 'react'
import store from '../store/index'
import { bindActionCreators } from 'redux'
import actions from '../store/actions/counter'
let bindedActions = bindActionCreators(actions, store.dispatch)
export default function Counter(props) {
  let [count, setCount] = useState(store.getState().counter.count)
  // 订阅
  useEffect(() => {
    store.subscribe(() => {
      setCount(store.getState().counter.count)
    })
  }, [])
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => bindedActions.add()}>+</button>
      <button onClick={() => bindedActions.minus()}>-</button>
    </div>
  )
}