const { routerMiddleware } = require("connected-react-router");

import { CALL_HISTORY_METHOD } from './actions'

// routerMiddleware是一个函数，参数是history对象，返回值是一个中间
export default routerMiddleware = (history) => middleWareAPI => next => action => {
    if (action.type === CALL_HISTORY_METHOD) {
        let { payload: { method, args } } = action
        // 如果派发的type是这个类型，就帮助跳转路径
        history[method](...args)
    } else {
        next(action)
    }

}