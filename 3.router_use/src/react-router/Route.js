import React from 'react'
import routerContext from './routerContext'
import matchPath from './matchPath'
/*
  Route也是一个组件，改组件用于匹配当前的路径，渲染对应的组件
*/

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
      let {path, component:Component, computedMatch} = this.props
      return (
        <routerContext.Consumer> 
           {
             context => {
                //context对象
                let {history, location} = context 
                //这里的匹配不是简单的匹配路径相同
                // let matched = path === location.pathname
                // Route的path
                let matched = computedMatch ? computedMatch : matchPath(location.pathname, {...this.props, path})
                let props = {history, location, matched}
                if(matched){
                    return <Component {...props} />
                }
                return null
             }
           }
        </routerContext.Consumer>
      )
    }
}