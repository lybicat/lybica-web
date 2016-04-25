import React, { Component } from 'react'
import { render } from 'react-dom'
import { hashHistory, Router, Route, IndexRoute } from 'react-router'
import { Layout, Fixed, Flex } from 'react-layout-pane'
import Icon from 'react-fontawesome'

import Dashboard from './components/dashboard'
import Login from './components/login'
import Tasks from './components/tasks'
import Task from './components/task'
import Plans from './components/plans'
import Schedules from './components/schedules'
import Triggers from './components/triggers'
import Releases from './components/releases'
import Agents from './components/agents'
import NavItem from './components/nav'

class App extends Component{
  render() {
    return (
      <Layout type="column">
        <Fixed className="navbar">
          <ul>
            <li><NavItem to="/" onlyActiveOnIndex={true}><Icon name="home"/>Home</NavItem></li>
            <li><NavItem to="/tasks"><Icon name="tasks"/>Tasks</NavItem></li>
            <li><NavItem to="/plans"><Icon name="book"/>Plans</NavItem></li>
            <li><NavItem to="/schedules"><Icon name="book"/>Schedules</NavItem></li>
            <li><NavItem to="/triggers"><Icon name="bolt"/>Triggers</NavItem></li>
            <li><NavItem to="/releases"><Icon name="diamond"/>Releases</NavItem></li>
            <li><NavItem to="/agents"><Icon name="desktop"/>Agents</NavItem></li>
          </ul>
          <Login />
        </Fixed>
        <Flex>{this.props.children}</Flex>
      </Layout>
    );
  }
};


render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="/tasks" component={Tasks}>
        <Route path="/tasks/:taskId" component={Task}/>
      </Route>
      <Route path="/plans" component={Plans}/>
      <Route path="/schedules" component={Schedules}/>
      <Route path="/triggers" component={Triggers}/>
      <Route path="/releases" component={Releases}/>
      <Route path="/agents" component={Agents}/>
    </Route>
  </Router>
), document.getElementById('bodyWrapper'));

