
import React from '../src/react'
import ReactDOM from '../src/react-dom'

// import React from 'react'
// import ReactDOM from 'react-dom'


// context 上下文,作用就是组件的跨级传递数据
let ThemeContext = React.createContext()
console.log(ThemeContext, 'ThemeContext')

class Child1 extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ padding: '10px', border: `2px solid ${this.context.color}` }}>
        Child1
        <Grandson1 />
      </div>
    )
  }
}
class Child2 extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {
          value => {
            return (
              <div style={{ padding: '10px', border: `2px solid ${value.color}` }}>
                Child2
                <Grandson2 />
              </div>
            )
          }
        }
      </ThemeContext.Consumer>
    )
  }
}
class Grandson1 extends React.Component {
  static contextType = ThemeContext
  render() {
    return (
      <div style={{ padding: '10px', border: `2px solid ${this.context.color}` }}>
        Grandson1
      </div>
    )
  }
}
class Grandson2 extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {
          value => (
            <div style={{ padding: '10px', border: `2px solid ${value.color}` }}>
              <p>Grandson2</p>
              <button onClick={() => value.handClick1()}>变红</button>
              <button onClick={() => value.handClick2()}>变绿</button>
            </div>
          )
        }
      </ThemeContext.Consumer>
    )
  }
}
class Page extends React.Component {
  constructor(props) {
    super(props)
    this.state = { color: 'red' }
  }
  handClick1 = () => {
    this.setState({ color: 'red' })
  }
  handClick2 = () => {
    this.setState({ color: 'green' })
  }
  render() {
    let value = {
      color: this.state.color,
      handClick1: this.handClick1,
      handClick2: this.handClick2
    }
    return (
      <ThemeContext.Provider value={value}>
        <div style={{ width: '300px', padding: '10px', border: `2px solid ${this.state.color}` }}>
          hello
          <Child1 />
          <Child2 />
        </div>
      </ThemeContext.Provider>
    )
  }
}
//使用render方法将element这个React元素渲染到root这个容器中
ReactDOM.render(<Page />, document.getElementById('root'))