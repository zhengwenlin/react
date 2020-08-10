import React from 'react'
import { Router } from 'react-router' // 依赖react-router库
import  createBrowserHistory  from '../history/createBrowserHistory' // 依赖history库

let history = createBrowserHistory()

// BrowserRouter是一个组件，内部用了Router组件，
// 主要是给Router组件传递了history对象和children两个属性
export default function (props) {
    return (
        <Router history={history} children={props.children} />
    )
}