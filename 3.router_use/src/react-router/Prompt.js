import React from 'react'
import LifeCycle from './LifeCycle'
import RouterContext from './routerContext'
export default class Prompt extends React.Component {

    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        let { when, message } = this.props
                        if (!when) return null;
                        let { history, location } = context
                        return <LifeCycle
                            onMount={(lifeInstance) => lifeInstance.release = history.block(message(location))}
                            onUnmount={(lifeInstance) => lifeInstance.release()}
                        />
                    }
                }
            </RouterContext.Consumer>

        )
    }
}