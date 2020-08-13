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
      let {path, component:Component, computedMatch, render} = this.props
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
                // Route组件会渲染对应的组件，然后将history对象，loaction对象，匹配对象都传递给这个组件
                let props = {history, location, matched}
                if(matched){
                  if(Component){
                    //如果有component属性
                    return <Component {...props} />
                  }else if(render){
                    //如果有render属性
                    return render(props)
                  }else {
                    return null;
                  }
                    
                }
                return null
             }
           }
        </routerContext.Consumer>
      )
    }
}