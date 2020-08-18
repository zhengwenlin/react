/**
 * 用户调用dispath，走的就是reducer方法
 * 合并reducers
 * @param {*} reducers 
 * 每个reducer有自己的状态和action动作
 * - 这里的合并有两个，1是状态的合并，2是处理函数的合并
 */
export default function combineReducers(reducers) {
    let reducerKeys = Object.keys(reducers)
    // 过滤掉不是函数的reducer
    let finalReducers = {}
    reducerKeys.forEach(item => {
        let key = reducerKeys[item]
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    })
    
    let finalReducerKeys = Object.keys(finalReducers) // ["counter1","counte2"]
    // 最终返回合并后的reducer函数,用户调用的就是这个函数
    return function (state = {}, action) {
       
    }
}
// {reducer1, reducer2}