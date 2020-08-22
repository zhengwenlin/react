
function isPromise(target) {
    return !!target && (typeof target === 'object' || typeof target === 'function') && typeof target.then === 'function'

}
/*
  有两种情况：
  1. action本身是promise
  2. action是一个普通对象，payload属性是promsie
 */

export default  (middlewareAPI) => (next) => (action) => {
    let { dispatch } = middlewareAPI;

    if (isPromise(action)) {
        return action.then(dispatch)
    } else {
        //payload属性是promsie
        return isPromise(action.payload) ?
            action.payload.then(result => dispatch({ ...action, payload: result }))
                .catch(error => {
                    dispatch({ ...action, payload: error, error: true })
                    return Promise.reject(error)
                }) :
            next(action)
    }

}