
export default  (middlewareAPI) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(middlewareAPI.dispatch, middlewareAPI.getState)
    }
    return next(action)
}