import React from 'react'
import RouterContext from './routerContext'
import LifeCycle from './LifeCycle'
//Redirect组件本身不会渲染，起到的是跳转重定向的作用
export default class Redirect extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        console.log(context, 'context')
                        let { from, to } = this.props
                        //改组件就渲染lifeCycle组件，这个组件内部主要是实现跳转的生命周期
                        return <LifeCycle onMount={(lfInstance) => { 
                            context.history.push(to, { from }) 
                        }} />
                    }
                }
            </RouterContext.Consumer>
        )
    }
}

