import React from 'react';
import { Link } from 'react-router'
import { Layout, Fixed, Flex } from 'react-layout-pane'
import $ from 'jquery'
import Loading from 'react-loading'
import SearchForm from '../SearchForm'


// TODO: remove the duplication via mixin
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
    return {page: 1, limit: 20, plans: [], loaded: false};
  },

  componentDidMount() {
    let apiUrl = '/api/plans?page=' + this.state.page + '&limit=' + this.state.limit;

    this.serverRequest = $.get(apiUrl, function(plans) {
      this.setState({
        loaded: true,
        plans: plans
      });
    }.bind(this));
  },

  componentWillUnmount() {
    this.serverRequest.abort();
  },

  render() {
    return (
      <Layout type="row">
        <Fixed style={styles.sidebar}>
          <SearchForm placeholder="Plan Name, author..."/>
          {this.state.loaded === false
            ? <Loading type="bars" color='#e3e3e3'/>
            : <ul>
                {this.state.plans.map(function(p) {
                  return (
                    <li key={p._id}>
                      <Link activeClassName="activeItem" to={`/plans/${p._id}`}>{p.name}</Link>
                    </li>)
                })}
              </ul>
          }
        </Fixed>
        <Flex style={styles.content}>{this.props.children}</Flex>
      </Layout>
    );
  }
});
