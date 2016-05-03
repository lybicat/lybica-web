import React from 'react'
import $ from 'jquery'

export default React.createClass({
  getInitialState() {
    return {};
  },

  componentDidMount() {
    let apiUrl = '/api/plan/' + this.props.params.planId;

    this.serverRequest = $.get(apiUrl, function(plan) {
      this.replaceState(plan);
    }.bind(this));
  },

  componentWillUnmount() {
    this.serverRequest.abort();
  },

  render() {
    return (
      <div className="planDetail">
        <ul>
          <li>Name: {this.state.name}</li>
          <li>Author: {this.state.createby}</li>
          <li>Last Update: {this.state.updateby}</li>
        </ul>
      </div>
    );
  }
});

