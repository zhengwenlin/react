/**
 *  不同的路径渲染不同的组件
    有两种实现方式
    HashRouter:利用hash实现路由切换
    BrowserRouter:实现h5 Api实现路由的切换
 */


 let elm  = document.getElementById('root')

 function handleClick (to) {
     history.pushState({to}, null, to)
     onpushstate({to}, null, to)
 }

 window.onpopstate = function(e){
     elm.innerHTML = e.state.to
 }
 window.onpushstate = function(state, title, to){
    elm.innerHTML = to
 }
 // 保存老的pushState方法
 let oldPushStateMethod = window.history.pushState;
 window.history.pushState = function(state, title, to){
    //调用老的pushState方法
    oldPushStateMethod.call(window.history, state, title, to)

    window.onpushstate(state, title, to)
 }
