
import React from 'react'

import RouterContext from './routerContext'

/**
 * withRouter: 
 *  - 是一个函数，不是组件
 *  - 类似于高阶组件的用法
 *  - 应用场景： 不适用Route组件渲染的组件，是没有history对象的，无法使用history对象
 *  - 数据来源： 来自于contex对象，可以用context对象单独给组件传数据
 */
/**
 * 接收旧的组件返回新的组件，该新组件可以获取到context对象
 * @param {*} OldComponent 老的组件
 */
 export default function withRouter(OldComponent) {
     

    return props => {
       return (
            <RouterContext.Consumer>
                {
                    context => {
                        return <OldComponent {...context} {...props} />
                    }
                }
            </RouterContext.Consumer>
        )
    }
 }