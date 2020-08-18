/**
 * 绑定一个
 * @param {*} actionCreator 
 * @param {*} dispatch 
 */
function bindActionCreator(actionCreator, dispatch) {
    return function () {
        // 拿到action对象
        let action = actionCreator()
        dispatch.call(this, action)
    }
}

/**
 * 绑定actionCreator和dispatch方法
 * @param {*} actionCreators 一个或者多个acionCreator，是函数或者对象
 * @param {*} dispatch store的dispatch方法
 * @returns 返回一个函数或者对象，看第一个参数的格式
 */
export default function bindActionCreators(actionCreators, dispatch) {
    console.log('run')
    let result = {}
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch)
    } else if (typeof actionCreators === 'object' && actionCreators !== null) {
        for (let key in actionCreators) {
            if (actionCreators.hasOwnProperty(key)) {
                let temp = bindActionCreator(actionCreators[key], dispatch)
                result[key] = temp
            }
        }
        return result
    }
}