/**
    action: "POP"
    createHref: ƒ createHref(location)
    go: ƒ go(n)
    goBack: ƒ goBack()
    goForward: ƒ goForward()
    length: 29
    listen: ƒ listen(listener)
    location: {pathname: "/profile", search: "", hash: "#/profile", state: undefined}
    push: ƒ push(path, state)
    replace: ƒ replace(path, state)
 */

// history是一个对象，对象中有一些属性和方法
let blcok;
export default function createBrowserHistory() {
    let globalHistory = window.history
    let listeners = []
    function listen(listener) {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }

    function setState(nextState) {
        Object.assign(history, nextState)
        history.length = globalHistory.length

        listeners.forEach(listener => listener(nextState))

    }
    //push方法
    function push(path, state) {
        let action = 'PUSH'
        let pathname
        // path有可能是一个字符串或者对象
        if (typeof path === 'string') {
            pathname = path
        } else if (typeof path === 'object') {
            pathname = path.pathname
            state = path.state
        }
        
        if(blcok){
            let result = window.confirm(blcok)
            if(!result){
                return
            }
        }

        globalHistory.pushState(state, null, pathname)
        let location = { pathname, state }
        setState({ action, location })
    }

    function go() {
        return globalHistory.go(arguments)
    }
    function goBack() {
        return globalHistory.go(-1)
    }
    function goForward() {
        return globalHistory.go(1)
    }
    // History对象
    let history = {
        action: 'POP',
        location: {
            pathname: window.location.pathname,
            hash: window.location.hash,
            state: globalHistory.state
        },
        length: globalHistory.length,
        go,
        goBack,
        goForward,
        listen,
        push,
        block(message) {
            blcok = message
            return function unblock() {
                blcok = null
            }
        }
    }

    return history
}