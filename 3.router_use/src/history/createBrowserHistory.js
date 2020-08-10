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

export default function createBrowserHistory() {
    let globalHistory = window.history
    let listeners = []
    function listen(listener) {
        listeners.push(listener)
    }

    function setState(nextState) {
        Object.assign(history, nextState)
        history.length = globalHistory.length

        listeners.forEach(listener => listener())

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
        globalHistory.pushState(state, null, path)
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
        push
    }

    return history
}