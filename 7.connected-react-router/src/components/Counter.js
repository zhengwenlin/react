import React from 'react'
import {connect} from 'react-redux'
import actions from '../store/actions/counter'
/**
 * 使用connected-react-router的作用：
 * 1. 可以在组件中跳转路由，比如：跳转到Home
 * 2. 页面路径改变后，redux中的路由信息回同步更新
 */
function Counter(props) {
  let { count } = props
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => props.add()}>+</button>
      <button onClick={() => props.minus()}>-</button>
      <button onClick={() => props.goto('/')}>跳转到Home</button>
    </div>
  )
}
const mapStateToProps = (state) => state.counter
export default connect(
  mapStateToProps,
  actions
)(Counter)