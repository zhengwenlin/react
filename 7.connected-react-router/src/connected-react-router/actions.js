


// 1.先实现跳转路径，靠的是push等方法

// 定义一个方法叫更新路径的方法
// 用户调用push方法跳转路径时派发的类型就是这个，会先走到中间件
export const CALL_HISTORY_METHOD = '@@router/CALL_HISTORY_METHOD'
/**
 * 
 * @param {*} method 方法名字
 * @returns 返回值是方法名对应的方法，这些方法其实是actionCreator
 */
const updateLocation = (method) => {
   return function(...args){
       return {
         type: CALL_HISTORY_METHOD,
         payload: {
             method,
             args
         }
       }
   }
}

export const push = updateLocation('push')