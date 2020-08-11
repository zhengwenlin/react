import React from 'react'
import {Router} from '../react-router' // 依赖react-router库
import  createBrowserHistory   from '../history/createBrowserHistory' // 依赖history库
class BrowserRouter extends React.Component {
    history = createBrowserHistory(this.props);
    render() {
      return <Router history={this.history} children={this.props.children} />;
    }
  }
  
  export default BrowserRouter;