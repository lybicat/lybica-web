import React from 'react';
import { Link } from 'react-router'
import { Layout, Fixed, Flex } from 'react-layout-pane'

export default React.createClass({
  getInitialState() {
    return {page: 1, limit: 20};
  },
  render() {
    return (
      <Layout type="row">
        <Fixed className="sidebar">
          <ul>
            <li><Link to='/tasks/123'>Task 123</Link></li>
            <li><Link to='/tasks/456'>Task 456</Link></li>
            <li><Link to='/tasks/890'>Task 890</Link></li>
          </ul>
        </Fixed>
        <Flex className="content">{this.props.children}</Flex>
      </Layout>
    );
  }
});
