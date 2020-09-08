import React from 'react';
import ReactDOM from 'react-dom';
import Counter from './components/Counter'
import Home from './components/Home'
import Profile from './components/Profile'
// 使用路由
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from 'react-router-dom'
// 使用react-redux
import { Provider } from 'react-redux'
import store from './store'
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <div><Link to="/">首页</Link></div>
        <div><Link to="/counter">Counter</Link></div>
        <div> <Link to="/profile">个人中心</Link></div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/counter" component={Counter} />
          <Route path="/profile" component={Profile} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

