import React from 'react';

export default React.createClass({
  getInitialState: function() {
    return {};
  },
  render: function() {
    return (
      <div className="taskDetail">
        <h1>Task</h1>
        This is task {this.props.params.taskId}!
      </div>
    );
  }
});
