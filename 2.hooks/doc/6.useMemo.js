import React from 'react'
import ReactDOM from 'react-dom'

//用于存放组件所有的状态（useState创建的、useMemo创建的、useCallback创建的）
let hookStates = [] 
let hookIndex = 0 // 指针
function useState(initalState) {
  hookStates[hookIndex] = hookStates[hookIndex] || (typeof initalState == 'function' ? initalState() : initalState)
  //缓存调用当前useState时的指针，因为每次调用useState时，指针都会向后移动，不固定，所以先缓存
  //然后再调用setState的时候，能通过缓存的指针找到对应的state然后更新
  let currentIndex = hookIndex
  function setState(newState){
     if(typeof newState === 'function'){
         newState = newState()
     }
     if(!Object.is(newState, hookStates[currentIndex])){
        hookStates[currentIndex] = newState
        render()
     }
     
   }
   return [hookStates[hookIndex++], setState]
}

/**
 * 核心：缓存对象,减少对象的创建次数
 * - 和useState一样，也是放到了hookStates数组中去
 * @param {*} callback 函数
 * @param {*} deps 依赖项 数组
 */
function useMemo(callback, deps){
    if(hookStates[hookIndex]){
      //如果有值的话
      let [lastMemo, lastMemoDeps] = hookStates[hookIndex]
      //根据依赖判断状态是否发生变化
      let same = deps.every((item,index) => item === lastMemoDeps[index])
      if(same){
        //如果一样的话就直接返回老的状态
        hookIndex++;
        return lastMemo
      }else{
        //否则返回新的状态
        let memo = callback()
        hookStates[hookIndex++] = [memo, deps]
        return memo
      }
    }else{
      let memo = callback()
      hookStates[hookIndex++] = [memo, deps]
      return memo
    }
}
/**
 * 用于减少函数创建的次数，缓存函数
 * @param {*} callback 函数
 * @param {*} deps 依赖项
 */
function useCallback(callback, deps){
  if(hookStates[hookIndex]){
    //如果老的依赖有值的话，就对比依赖
    let [lastCallback, lastCallbackDeps] = hookStates[hookIndex]

    let same = deps.every((item, index) => item===lastCallbackDeps[index])

    if(same){
      //如果依赖不变，就返回老的state
      hookIndex++
      return lastCallback
    }else{
      hookStates[hookIndex++] = [callback, deps]
      return callback
    }
  }else{
    hookStates[hookIndex++] = [callback, deps]
    return callback
  }
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
    let [name, setName] = useState('zf')
    let [age, setAge] = useState(18)
    /**
     * 因为每次组件渲染的时候，变量都是全新的，所以即使变量的值没有变，但是
     * 引用已经变了，是一个全新的变量
     * 使用React.useMemo用于减少对象的创建次数，缓存对象
     */
    let data = useMemo(() => ({age}), [age])
    const handleClick = useCallback(() => {
        setAge(age + 1)
    }, [age])
    return (
        <div>
           <input value={name} onChange={event => setName(event.target.value)} />
           <MemoChild data={data} handleClick={handleClick} />
        </div>
    )
}
function render() {
    hookIndex = 0
    ReactDOM.render(<App />, document.getElementById('root'))
}
render()
