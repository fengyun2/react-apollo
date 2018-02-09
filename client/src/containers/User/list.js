import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';

// 把ApolloClient 作为组件的属性直接访问
import { withApollo } from 'react-apollo';

import { Table } from 'antd';

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
  {
    users(first_name: "Sonny", last_name: "Read") {
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
  fetchUserList = async () => {
    const result = await this.props.client.query({
      query: FETCH_USER_LIST,
    });
    const users = result.data.users;
    this.setState({
      users,
    });
  };
  componentDidMount() {
    this.fetchUserList();
  }
  render() {
    const { users = [] } = this.state;
    return (
      <div className="user_list">
        <Table columns={columns} dataSource={users} />
      </div>
    );
  }
}

UserList.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
};
export default withApollo(UserList);
