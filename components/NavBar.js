import React from 'react'
import { Link } from 'react-router'
import { Fixed } from 'react-layout-pane'
import Icon from 'react-fontawesome'
import Login from './login'

const MenuItem = React.createClass({
  render() {
    return (
      <li>
        <Link activeClassName="activeMenu" to={this.props.url} onlyActiveOnIndex={this.props.onlyActiveOnIndex}>
          <Icon name={this.props.icon}/>
          {this.props.name}
        </Link>
      </li>
    )
  }
});


const menus = [
  {name: "Home", icon: "home", url: "/", onlyActiveOnIndex: true},
  {name: "Tasks", icon: "tasks", url: "/tasks"},
  {name: "Plans", icon: "book", url: "/plans"},
  {name: "Schedules", icon: "calendar", url: "/schedules"},
  {name: "Triggers", icon: "bolt", url: "/triggers"},
  {name: "Releases", icon: "diamond", url: "/releases"},
  {name: "Agents", icon: "desktop", url: "/agents"},
].map((item)=><MenuItem
  name={item.name}
  icon={item.icon}
  url={item.url}
  onlyActiveOnIndex={item.onlyActiveOnIndex}/>);


export default React.createClass({
  render() {
    return (
      <Fixed className="navbar">
        <ul>{menus}</ul>
        <Login />
      </Fixed>
    );
  }
});
