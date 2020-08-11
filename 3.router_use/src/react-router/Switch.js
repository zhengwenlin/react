import React from 'react'
import RouterContext from './routerContext'
import matchPath from './matchPath'

//Switch组件
//Switch组件值渲染的是匹配到的第一个符合条件的Route组件,
//在Route组件中，可以获取到传递给Route的参数
export default class Switch extends React.Component {

    render() {
        return <RouterContext.Consumer>
            {
                context => {
                    let { location } = context
                    // 遍历子节点，匹配一个就结束
                    let element, match;
                    //遍历儿子
                    React.Children.forEach(this.props.children, child => {
                        //如果没有匹配到， 并且是合法的React元素
                        if (!match && React.isValidElement(child)) {
                            element = child
                            let path = child.props.path || child.props.from
                            match = matchPath(location.pathname, {...child.props, path})
                        }
                    })
                    console.log(match, 'match')

                    if (match) {
                        return React.cloneElement(element, { location, computedMatch: match })
                    }
                    return null
                }
            }
        </RouterContext.Consumer>
    }
}