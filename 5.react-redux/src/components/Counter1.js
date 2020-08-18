import React from 'react'
import actions from '../store/actions/counter1'
import {connect} from 'react-redux'
// 使用bindActionCreators绑定actionCreator和dispatch

function Counter1(props) {

    return (
        <div>
            <p>{props.number}</p>
            <button onClick={props.add}>+</button>
            <button onClick={props.minus}>-</button>
        </div>
    )
}
const mapStateToProps = state => state.reducer1;
const mapDispatchToProps = dispatch => (actions)
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter1)