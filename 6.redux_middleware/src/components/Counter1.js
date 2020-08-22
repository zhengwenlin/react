import React from 'react'
// import actions from '../store/actions/counter1'
import {connect} from '../react-redux'
import * as actionTypes from '../store/action-types'
// 使用bindActionCreators绑定actionCreator和dispatch

function Counter1(props) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // promise 可以resolve一个action对象
            resolve(fn)
        },2000)
    })
    let fn = function (dispatch) {
        dispatch({type:actionTypes.ADD})
    }
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => props.dispatch(function(dispatch, getState){
                // 让action可以支持函数，默认只能是对象
                setTimeout(()=>{
                    dispatch({type:actionTypes.ADD})
                },2000)
            })}>function+</button>
            <button onClick={() => props.dispatch(promise)}>promise+</button>
            <button onClick={() => props.dispatch({type:actionTypes.MINUS})}>-</button>
        </div>
    )
}
const mapStateToProps = state => state.reducer1;
// const mapStateToProps = state=>state.counter1;
// const mapDispatchToProps = dispatch => ({
//     add(){
//         dispatch({type: actions.add()})
//     },
//     minus(){
//         dispatch({type: actions.minus})
//     }
// })
export default connect(
  mapStateToProps
)(Counter1)