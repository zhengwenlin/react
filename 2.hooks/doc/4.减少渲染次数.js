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
let lastCallback, lastDeps;
function useMemo(initalCallback, deps){
    if(deps){

    }else{

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

    // let data = React.useMemo(() => ({age}), [age])
    let data = {age}
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