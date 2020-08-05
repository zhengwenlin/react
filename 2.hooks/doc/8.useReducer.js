import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 
 * @param {*} reducer 处理器
 * @param {*} initialState 初始状态
 */
let hookStates = []
let hookIndex = 0
function useReducer(reducer, initialState){
  hookStates[hookIndex] = hookStates[hookIndex] || initialState
  let currentIdx = hookIndex
  function dispatch(action){
    if(reducer){
      hookStates[currentIdx] = reducer(hookStates[currentIdx], action)
      
    }else{
      //如果reducer是null的话，就是useState
      hookStates[currentIdx] = action
    }
    render();
  }
  return [hookStates[hookIndex++], dispatch]
}

function useState(initialState){
  return useReducer(null, initialState)
}

// recuder 是一个处理器，根据不同的动作，做对应的修改state的操作，并返回修改后的state
function reducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { number: state.number + 1 }
    case 'DECREMENT':
      return { number: state.number - 1 }
    default:
      return state
  }
}
function App() {
  let [num, setNum] = useState(100)
  let [state, dispath] = useReducer(reducer, { number: 0 })
  return (
    <>
      <div>{state.number}</div>
      <p>{num}</p>
      <button onClick={() => dispath({type: 'ADD'})}>ADD</button>
      <button onClick={() => dispath({type: 'DECREMENT'})}>DECREMENT</button>
      <button onClick={() => setNum(num + 1)}>setNum</button>
    </>
  )
}

function render() {
  hookIndex = 0
  ReactDOM.render(<App />, document.getElementById('root'))
}
render()
