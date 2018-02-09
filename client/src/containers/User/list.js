import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';

// 把ApolloClient 作为组件的属性直接访问
import { withApollo } from 'react-apollo';

import { Table } from 'antd';

import SearchInput from './search';

const columns = [
  {
    title: '姓名',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: '地区',
    dataIndex: 'country',
    key: 'country',
  },
];

const FETCH_USER_LIST = gql`
  query TodoAppSchema(
    $first_name: String
    $last_name: String
    $country: String
  ) {
    users(first_name: $first_name, last_name: $last_name, country: $country) {
      id
      first_name
      last_name
      email
      gender
      department
      country
      todo_count
      todos {
        id
        title
        completed
      }
    }
    todos {
      id
      title
    }
  }
`;
class UserList extends Component {
  state = {
    users: [],
    loading: false,
  };
  fetchUserList = async (params = {}) => {
    this.setState({
      loading: true,
    });
    const result = await this.props.client.query({
      query: FETCH_USER_LIST,
      variables: params,
    });
    const users = result.data.users;

    this.setState({
      users,
      loading: false,
    });
  };
  componentDidMount() {
    this.fetchUserList();
  }
  render() {
    const { users = [], loading } = this.state;
    return (
      <div className="user_list">
        <header className="header">
          <SearchInput
            field="country"
            placeholder="请输入名字"
            style={{ width: 200 }}
            onSearch={this.fetchUserList}
          />
        </header>
        <Table columns={columns} dataSource={users} loading={loading} />
      </div>
    );
  }
}

UserList.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
};
export default withApollo(UserList);