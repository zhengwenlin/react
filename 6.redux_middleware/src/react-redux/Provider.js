import React from 'react'
import ReactReduxContext from './Context'
export default class Provider extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        let { store, children } = this.props
        return (
            <ReactReduxContext.Provider value={{store}}>
                {children}
            </ReactReduxContext.Provider>
        )
    }
}