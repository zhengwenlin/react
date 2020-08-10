import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from './react-router-dom'
import Home from './components/Home.js'
import About from './components/About.js'
import Profile from './components/Profile.js'
import history from './history'
console.log(history) 
ReactDOM.render(
  <Router>
    <>
      {/* <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="profile">Profile</Link></li>
      </ul> */}
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </>
  </Router>
  ,
  document.getElementById('root')
);
