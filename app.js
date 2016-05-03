import React, { Component } from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import { Layout, Flex } from 'react-layout-pane'

import NavBar from './components/NavBar'
import DashboardPage from './components/DashboardPage'
import TaskPage from './components/TaskPage'
import TaskDetail from './components/TaskPage/TaskDetail'
import PlanPage from './components/PlanPage'
import PlanDetail from './components/PlanPage/PlanDetail'
import Schedules from './components/schedules'
import Triggers from './components/triggers'
import Releases from './components/releases'
import Agents from './components/agents'

class App extends Component{
  render() {
    return (
      <Layout type="column">
        <NavBar />
        <Flex>
          {this.props.children}
        </Flex>
      </Layout>
    );
  }
};


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={DashboardPage}/>
      <Route path="/tasks" component={TaskPage}>
        <Route path="/tasks/:taskId" component={TaskDetail}/>
      </Route>
      <Route path="/plans" component={PlanPage}>
        <Route path="/plans/:planId" component={PlanDetail}/>
      </Route>
      <Route path="/schedules" component={Schedules}/>
      <Route path="/triggers" component={Triggers}/>
      <Route path="/releases" component={Releases}/>
      <Route path="/agents" component={Agents}/>
    </Route>
  </Router>
), document.getElementById('bodyWrapper'));

