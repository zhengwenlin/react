/**
 * 用户调用dispath，走的就是reducer方法
 * 合并reducers
 * @param {*} reducers 
 * 每个reducer有自己的状态和action动作
 * - 这里的合并有两个，1是状态的合并，2是处理函数的合并
 * - reducer函数函数的作用： 接收state和action，返回新的状态
 */
export default function combineReducers(reducers) {
  let reducerKeys = Object.keys(reducers)
  // 过滤掉不是函数的reducer
  let finalReducers = {}
  reducerKeys.forEach(item => {
    let key = item
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  })
  let finalReducerKeys = Object.keys(finalReducers) // ["counter1","counte2"]
  // 最终返回合并后的reducer函数,用户调用的就是这个函数
  // 该函数就是计算新的状态的 {counter1, counter2}
  return function (state = {}, action) {
    let hasChange = false; // 是否修改过
    let nextState = {} // 最终返回的状态
    for (let i in finalReducerKeys) {
      let key = finalReducerKeys[i] // key
      // 每一个reducer
      let reducer = finalReducers[key]

      // 计算每一个分状态
      let previousStateForKey = state[key] // 上一次的分状态，根据key获取
      //当前计算出来的分状态
      let nextStateForKey = reducer(previousStateForKey, action)
      nextState[key] = nextStateForKey
      // 如果一次改变hasChange就不会再变化，或者有一次分状态不一样hasChange就位true
      hasChange = hasChange || (previousStateForKey !== nextState)
    }
    // 如果reducer的key的长度和state的key的长度不一样，也是变化的
    hasChange = hasChange || (finalReducerKeys.length !== Object.keys(state).length)
    // 为了性能优化，如果状态没变，就用老状态，这样数据不变，组件可能不需要重新渲染
    return hasChange ? nextState : state
  }
}
// {reducer1, reducer2}