import React from 'react'
import ReactDOM from 'react-dom'
let lastState;
function useState (initalState){
    let state = lastState || (typeof initalState === 'function' ? initalState(): initalState)

    function setState(newState){
        //newState也可能是一个函数
        if(typeof newState == 'function'){
            newState = newState()      
        }
        if(!Object.is(lastState, newState)){
            lastState = newState
            render()
        }
    }
    return [state, setState]
}
/**
 * 性能优化
 * 1. Object.is()比较两次的状态，如果是同一个的话就不更新，提高性能
 */
function App() {
    let [number, setNumber] = useState(0)
    return (
        <div>
            <p>{number}</p>
            <button onClick={() => setNumber(number)}>用自己更新自己</button>
            <button onClick={() => setNumber(number + 1)}>+</button>
        </div>
    )
}

function render() {
    ReactDOM.render(<App />, document.getElementById('root'))
}
render()