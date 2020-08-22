import React, { useContext } from 'react'
import ReactReduxContext from './Context'
import { bindActionCreators } from 'redux'
// connect 就是高阶组件的用法 柯里化
/**
 * connect方法
 * @param {*} mapStateToProps 是一个函数，用于传入总状态，返回分状态
 * @param {*} mapDispatchToProps 将dispatch方法映射为组件的属性
 */
export default function connect(mapStateToProps, mapDispatchToProps) {
    return function (Component) {
        return function (props) {
            //拿到context对象,context是一个对象，对象中有store属性
            let { store } = React.useContext(ReactReduxContext)
            let { getState, dispatch, subscribe } = store
            //分状态属性
            let stateProps = mapStateToProps(getState())
            //拿到dispatch方法
            let dispathProps = {}
            if (typeof mapDispatchToProps === 'function') {
                dispathProps = mapDispatchToProps(dispatch)
            } else if (typeof mapDispatchToProps === 'object') {
                dispathProps = bindActionCreators(mapDispatchToProps, dispatch)
            } else {
                dispathProps = { dispatch }
            }
            // setState会触发组件更新，即使组件没有用到这个数据
            let [, forceUpdate] = React.useState(0)
            // 差一个订阅，当store的数据变化的时候，更新组件
            React.useEffect(() => {
                //当store的数据变化时，触发subscribe参数回调
                subscribe(() => {
                    forceUpdate(x => x + 1)
                })
            }, [])
            return <Component {...props} {...stateProps} {...dispathProps} />
        }
    }
}