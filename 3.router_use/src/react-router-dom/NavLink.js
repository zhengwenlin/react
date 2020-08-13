import React from 'react'
import RouterContext from '../react-router/routerContext'
import Link from './Link'

import matchPath from '../react-router/matchPath';

function mergeClassNames(...classNames) {
    return classNames.filter(i => i).join(' ')
}

// 匹配到路径后，显示对应的样式

export default class NavLink extends React.Component {
    render() {
        return (
            <RouterContext.Consumer>
                {
                    context => {
                        let {
                            style: styleProp={},
                            activeStyle={},
                            className: classNameProp='',
                            activeClassName,
                            to,
                            children
                        } = this.props
                        //是否处于激活状态
                        let { location, history } = context
                        let isActive = matchPath(location.pathname, { path: to, exact: this.props.exact })
                        //合并类名和样式
                        let className, style
                        if (isActive) {
                            className = mergeClassNames(classNameProp, activeClassName)
                            style = { ...styleProp, ...activeStyle }
                        } else {
                            className = classNameProp
                            style = styleProp
                        }
                        let prop = { className, style, to, children }
                        return (
                            <Link {...prop} />
                        )
                    }
                }
            </RouterContext.Consumer>
        )
    }
}