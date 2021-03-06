import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink } from '../react-router-dom'
import Home from '../components/Home.js'
import About from '../components/About.js'
import Profile from '../components/Profile.js'
import Protected from '../components/Protected'
import User from '../components/User.js'
import Login from '../components/Login.js';
import NavHeader from '../components/NavHeader.js';
ReactDOM.render(
  <Router>
    <div>
      <NavHeader title="zf架构" />
    <ul>
      <li>
        <NavLink
          to="/home"
          className="strong"
          activeClassName="active"
          style={{ color: 'pink', cursor: 'pointer',textDecoration: 'underline', }}
          activeStyle={{ color: 'skyblue', fontWeight: '700' }}
        >主页</NavLink>
      </li>
      <li><NavLink
        to="/home"
        className="strong"
        activeClassName="active"
        style={{ color: 'pink', cursor: 'pointer',textDecoration: 'underline', }}
        activeStyle={{ color: 'skyblue', fontWeight: '700' }}
        to="/about">关于</NavLink></li>
      <li><NavLink
        to="/home"
        className="strong"
        activeClassName="active"
        style={{ color: 'pink', cursor: 'pointer',textDecoration: 'underline', }}
        activeStyle={{ color: 'skyblue', fontWeight: '700' }}
        to="/profile">个人中心</NavLink></li>
      <li><NavLink
        to="/home"
        className="strong"
        activeClassName="active"
        style={{ color: 'pink', cursor: 'pointer',textDecoration: 'underline', }}
        activeStyle={{ color: 'skyblue', fontWeight: '700' }}
        to="/user">用户</NavLink></li>
    </ul>
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/about" component={About} />
      {/* 受保护的路由 */}
      <Protected path="/profile" component={Profile} />
      <Route path="/user" component={User} />
      <Route path="/login" component={Login} />
      <Redirect from="/" to="/home" />
    </Switch>
    </div>
  </Router>
  ,
  document.getElementById('root')
);
