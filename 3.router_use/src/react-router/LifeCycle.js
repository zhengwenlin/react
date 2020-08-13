import React from 'react'

/**
 * 该组件渲染null，主要是使用生命周期
 */
class LifeCycle extends React.Component {
    componentDidMount() {
        if (this.props.onMount) this.props.onMount.call(this, this)
    }
    componentWillUpdate() {
        if (this.props.onUpdate) this.props.onUpdate.call(this, this)
    }
    componentWillUnmount() {
        if (this.props.onUnmount) this.props.onUnmount.call(this, this)
    }
    render() {
        return null
    }
}

export default LifeCycle