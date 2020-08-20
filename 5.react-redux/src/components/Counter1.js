import React from 'react'
import actions from '../store/actions/counter1'
import {connect} from '../react-redux'
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
// const mapStateToProps = state=>state.counter1;
const mapDispatchToProps = dispatch => ({
    add(){
        dispatch({type: actions.add()})
    },
    minus(){
        dispatch({type: actions.minus})
    }
})
export default connect(
  mapStateToProps,
  actions
)(Counter1)