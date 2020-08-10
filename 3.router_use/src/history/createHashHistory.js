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

export default function createHashHistory() {
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

    window.onhashchange = function(e) {
        setState({pathname: window.location.hash.slice(1)})
    }
    //push方法
    function push(path, state) {
        let pathname
        // path有可能是一个字符串或者对象
        if (typeof path === 'string') {
            pathname = path
        } else if (typeof path === 'object') {
            pathname = path.pathname
            state = path.state
        }
        window.localStorage.hash = pathname
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
        listen,
        push
    }

    return history
}