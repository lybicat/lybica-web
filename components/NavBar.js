import React from 'react'
import { Link } from 'react-router'
import { Fixed } from 'react-layout-pane'
import Icon from 'react-fontawesome'
import LoginForm from './LoginForm'

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


export default React.createClass({
  propTypes: {
    menus: React.PropTypes.array.isRequired
  },
  render() {
    return (
      <Fixed className="navbar">
        <ul>{this.props.menus.map((item)=><MenuItem
  name={item.name}
  icon={item.icon}
  url={item.url}
  onlyActiveOnIndex={item.onlyActiveOnIndex}/>)}</ul>
        <LoginForm />
      </Fixed>
    );
  }
});
