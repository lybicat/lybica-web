import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import { Layout, Flex } from 'react-layout-pane';

import NavBar from './components/NavBar';
import DashboardPage from './components/DashboardPage';
import TaskPage from './components/TaskPage';
import TaskDetail from './components/TaskPage/TaskDetail';
import PlanPage from './components/PlanPage';
import PlanDetail from './components/PlanPage/PlanDetail';
import SchedulePage from './components/SchedulePage';
import TriggerPage from './components/TriggerPage';
import ReleasePage from './components/ReleasePage';
import AgentPage from './components/AgentPage';


const menus = [
  {name: 'Home', icon: 'home', url: '/', onlyActiveOnIndex: true},
  {name: 'Tasks', icon: 'tasks', url: '/tasks'},
  {name: 'Plans', icon: 'book', url: '/plans'},
  {name: 'Schedules', icon: 'calendar', url: '/schedules'},
  {name: 'Triggers', icon: 'bolt', url: '/triggers'},
  {name: 'Releases', icon: 'diamond', url: '/releases'},
  {name: 'Agents', icon: 'desktop', url: '/agents'},
];


class App extends Component{
  render() {
    return (
      <Layout type="column">
        <NavBar menus={menus}/>
        <Flex>
          {this.props.children}
        </Flex>
      </Layout>
    );
  }
}


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
      <Route path="/schedules" component={SchedulePage}/>
      <Route path="/triggers" component={TriggerPage}/>
      <Route path="/releases" component={ReleasePage}/>
      <Route path="/agents" component={AgentPage}/>
    </Route>
  </Router>
), document.getElementById('bodyWrapper'));

