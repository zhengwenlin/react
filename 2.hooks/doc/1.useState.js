import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 为什么定义全局变量？
 * 共享一个值，多次渲染只保留一份值
 * 这里的共享指的是函数组件多次调用（函数组件使用多次，用的都是同一个数据）
 */
let lastState;
function useState(initialState) {
    let state = lastState || initialState
    function setState(newState) {
        lastState = newState
        render()
    }
    return [
        state,
        setState
    ]
}
function Counter(props) {
    let [number, setNumber] = useState(0)
    function btnClick() {
        setNumber(number + 1)
        console.log(number, 'number')
    }
    return (
        <div>
            {number}
            <button onClick={btnClick}>+</button>
        </div>
    )
}

function Counter1(props) {
    let [number, setNumber] = useState(0)
    function btnClick() {
        setNumber(number + 1)
        console.log(number, 'number')
    }
    return (
        <div>
            {number}
            <button onClick={btnClick}>+</button>
        </div>
    )
}

function render() {
    let element = <div><Counter /><Counter1 /></div>
    ReactDOM.render(element, document.getElementById('root'))
}
render()