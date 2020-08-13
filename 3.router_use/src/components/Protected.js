/**
 * 受保护的组件
 * - 就是组件的权限（没有登录，没有权限，是看不到这个组件的）
 * - render属性是一个函数，可以使用逻辑渲染组件
 * - 使用Redirect重定向
 */

 import React from 'react'
 import { Route, Redirect } from '../react-router-dom'
 export default class Protected extends React.Component {
    
    render() {
        let { path, component: RouteComponent } = this.props
        return (
            <Route path={path} render={
                (routeProps) => {
                    let isLogin = localStorage.getItem('login')
                    if(isLogin){
                        return <RouteComponent {...routeProps} />
                    }
                    return <Redirect to={{pathname: '/login', state: {from: routeProps.location.pathname}}} />
                }
            } />
        )
    }
 }