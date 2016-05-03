// TODO: use mixin for sidebar/content mode
import React from 'react';
import { Link } from 'react-router'
import { Layout, Fixed, Flex } from 'react-layout-pane'

const styles = {
  sidebar: {
    padding: '1em',
    borderRight: '1px solid lightgrey',
    width: '40%'
  },
  content: {
    padding: '1em'
  }
}

export default React.createClass({
  getInitialState() {
    return {page: 1, limit: 20};
  },
  render() {
    return (
      <Layout type="row">
        <Fixed style={styles.sidebar}>
          <ul>
            <li><Link to='/tasks/123'>Task 123</Link></li>
            <li><Link to='/tasks/456'>Task 456</Link></li>
            <li><Link to='/tasks/890'>Task 890</Link></li>
          </ul>
        </Fixed>
        <Flex style={styles.content}>{this.props.children}</Flex>
      </Layout>
    );
  }
});
