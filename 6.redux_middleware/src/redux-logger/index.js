

export default (middlewareAPI) => (next) => (action) => {

    console.log('prev State:', middlewareAPI.getState())
    next(action)
    console.log('new State:', middlewareAPI.getState())
}