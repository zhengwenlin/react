import React from 'react';
import ReactDOM from 'react-dom';
/**
 *  
    exports.createStore = createStore; // 创建store
    exports.bindActionCreators = bindActionCreators; // 绑定action
    exports.combineReducers = combineReducers; //合并reducer

    exports.applyMiddleware = applyMiddleware; // 应用中间件
    exports.compose = compose; // compose
 */
import { createStore, bindActionCreators } from 'redux'
/**
 * 1. ceateStore方法：
 * - 创建仓库的方法，参数一是处理器(reducer)
 * 2. bindActionCreators方法： 绑定actionCreators的
 */
function reducer(state = { number: 0 }, action) {

  switch (action.type) {
    case 'add':
      return { number: state.number + 1 };
    case 'minus':
      return { number: state.number - 1 };
    default:
      return state;
  }
}
let store = createStore(reducer)

function App() {
  //组件的状态，来自于store
  let [number, setNumber] = React.useState(store.getState().number)
  //当store中的状态改变后，重新刷新组件，订阅
  React.useEffect(() => {
    store.subscribe(() => {
      setNumber(store.getState().number)
    })
  }, [])
  return (
    <div>
      <p>{number}</p>
      <button onClick={() => store.dispatch({ type: 'add' })}>+</button>
      <button onClick={() => store.dispatch({ type: 'minus' })}>-</button>
    </div>
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
