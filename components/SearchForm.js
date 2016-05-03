import React from 'react';
import Icon from 'react-fontawesome'

export default React.createClass({
  render() {
    return (
      <div className="search-input">
        <input {...this.props} type="text"/>
        <Icon name="search"/>
      </div>
    );
  }
});

