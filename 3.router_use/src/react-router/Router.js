import React from 'react'
import RouterContext from './routerContext'

// Router是一个组件
// Router本身并没有什么dom结构，渲染自己的children
/*
    Router组件有两个功能：
    1.提供数据给下级  
    2.添加监听，当路径变化了，让组件更新
*/
class Router extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            location: props.history.location,
            history: props.history
        }

        //当路径发生变化了会执行该回调函数
        this.unListenFn = this.props.history.listen(({ location }) => {
            this.setState({ ...this.state, location })
        })
    }
    //添加监听
    componentDidMount() {

    }
    //注销监听
    componentWillUnmount() {
        this.unListenFn()
    }

    render() {
        console.log('Rotuer run')
        let value = {
            location: this.state.location,
            history: this.state.history
        }
        return (
            <RouterContext.Provider value={value}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}

export default Router;