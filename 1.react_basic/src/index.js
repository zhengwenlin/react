
// import React from './react'
// import ReactDOM from './react-dom'

import React from 'react'
import ReactDOM from 'react-dom'

// 高阶组件 - 日志组件

function logger(Component){
  
  return class extends React.Component{
    componentWillMount(){
      this.start = new Date().getTime()
    }
    componentDidMount(){
      console.log( (new Date().getTime() - this.start) + 'ms')
    }
    render(){
      return (
        <Component {...this.props} />
      )
    }
  }
}
function Counter(){
  return (
    <div>count</div>
  )
}
let Page = logger(Counter)

//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(<Page />, document.getElementById('root'))