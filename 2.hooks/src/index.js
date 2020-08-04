import React from 'react'
import ReactDOM from 'react-dom'

let lastState;
function useState(initalState) {
   let state = lastState || (typeof initalState == 'function' ? initalState() : initalState)
   
   function setState(newState){
    
     if(typeof newState === 'function'){
         newState = newState()
     }
     if(!Object.is(newState, lastState)){
        lastState = newState
        render()
     }
     
   }
   return [state, setState]
}
let lastCallback, lastCallbackDeps;
/**
 * 核心：缓存对象
 * @param {*} initalCallback 
 * @param {*} deps 依赖项 数组
 */
function useMemo(initalCallback, deps){
    if(lastCallbackDeps){
        //如果上一次的依赖有的话，就要比较了
        let same = deps.every((item,index) => item === lastCallbackDeps[index])
        if(same){
            lastCallbackDeps = deps
            lastCallback = initalCallback
        }else{
            
        }
    }else{
        lastCallbackDeps = deps
        lastCallback = initalCallback
    }
    return lastCallback
}
/**
 * 性能优化：减少渲染次数
 */
function Child(props){
    console.log('Child render')
    return (
      <> 
        <p>{props.data.age}</p>
        <button onClick={props.handleClick}>click</button>
      </>
    )
}
/**
 * 如果你想让一个函数组件有这样的功能，属性不变，组件就不刷新
 * memo 备忘录
 */
let MemoChild = React.memo(Child)
function App(){
    let [name, setName] = React.useState('zf')
    let [age, setAge] = React.useState(18)
    /**
     * 因为每次组件渲染的时候，变量都是全新的，所以即使变量的值没有变，但是
     * 引用已经变了，是一个全新的变量
     * 使用React.useMemo用于减少对象的创建次数，缓存对象
     */
    let data = React.useMemo(() => ({age}), [age])
    const handleClick = React.useCallback(() => {
        setAge(age + 1)
    }, [age])
    return (
        <div>
           <input value={name} onChange={event => setName(event.target.value)} />
           <MemoChild data={data} />
        </div>
    )
}
function render() {
    ReactDOM.render(<App />, document.getElementById('root'))
}
render()
