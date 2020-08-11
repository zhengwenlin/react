import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink} from './react-router-dom'
import Home from './components/Home.js'
import About from './components/About.js'
import Profile from './components/Profile.js'
import User from './components/User.js'
ReactDOM.render(
  <Router>
    <ul>
      <li><Link to="/home">主页</Link></li>
      <li><Link to="/about">关于</Link></li>
      <li><Link to="/profile">个人中心</Link></li>
      <li><Link to="/user">用户</Link></li>
    </ul>
    <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/user" component={User} />
        <Redirect from="/" to="/home" />
    </Switch>
  </Router>
  ,
  document.getElementById('root')
);
