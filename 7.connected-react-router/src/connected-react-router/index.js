/**
 * connected-react-router的作用
 * 1. 可以使用派发action的方式跳转路由
 * 2. 当路径发生变化时，将路由信息同步到redux中
 */
export {default as ConnectedRouter} from './ConnectedRouter'
export {default as routerMiddleware} from './middleware'
export {default as connectRouter} from './reducer'
export { push } from './actions'