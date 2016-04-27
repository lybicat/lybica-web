import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router'
import { Layout, Fixed, Flex } from 'react-layout-pane'
import Icon from 'react-fontawesome'

import Dashboard from './components/dashboard'
import Login from './components/login'
import Tasks from './components/tasks'
import Task from './components/task'
import Plans from './components/plans'
import Plan from './components/plan'
import Schedules from './components/schedules'
import Triggers from './components/triggers'
import Releases from './components/releases'
import Agents from './components/agents'

class App extends Component{
  render() {
    return (
      <Layout type="column">
        <Fixed className="navbar">
          <ul>
            <li><Link activeClassName="activeMenu" to="/" onlyActiveOnIndex={true}><Icon name="home"/>Home</Link></li>
            <li><Link activeClassName="activeMenu" to="/tasks"><Icon name="tasks"/>Tasks</Link></li>
            <li><Link activeClassName="activeMenu" to="/plans"><Icon name="book"/>Plans</Link></li>
            <li><Link activeClassName="activeMenu" to="/schedules"><Icon name="book"/>Schedules</Link></li>
            <li><Link activeClassName="activeMenu" to="/triggers"><Icon name="bolt"/>Triggers</Link></li>
            <li><Link activeClassName="activeMenu" to="/releases"><Icon name="diamond"/>Releases</Link></li>
            <li><Link activeClassName="activeMenu" to="/agents"><Icon name="desktop"/>Agents</Link></li>
          </ul>
          <Login />
        </Fixed>
        <Flex>{this.props.children}</Flex>
      </Layout>
    );
  }
};


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/tasks" component={Tasks}>
        <Route path="/tasks/:taskId" component={Task}/>
      </Route>
      <Route path="/plans" component={Plans}>
        <Route path="/plans/:planId" component={Plan}/>
      </Route>
      <Route path="/schedules" component={Schedules}/>
      <Route path="/triggers" component={Triggers}/>
      <Route path="/releases" component={Releases}/>
      <Route path="/agents" component={Agents}/>
    </Route>
  </Router>
), document.getElementById('bodyWrapper'));

