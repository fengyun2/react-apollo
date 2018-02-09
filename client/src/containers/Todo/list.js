import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';

// 把ApolloClient 作为组件的属性直接访问
import { withApollo } from 'react-apollo';

import { Table } from 'antd';

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '作者',
    dataIndex: 'user.first_name',
    key: 'author',
  },
  {
    title: '已完成',
    dataIndex: 'completed',
    key: 'completed',
    render(text, record) {
      return record.completed ? '已完成' : '未完成';
    },
  },
];

const FETCH_TODO_LIST = gql`
  query TodoAppSchema($userId: Int) {
    users {
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
    todos(userId: $userId) {
      id
      title
      completed
      user {
        id
        first_name
      }
    }
  }
`;
class TodoList extends Component {
  state = {
    todos: [],
    loading: false,
  };
  fetchTodoList = async (params = {}) => {
    this.setState({
      loading: true,
    });
    try {
      const result = await this.props.client.query({
        query: FETCH_TODO_LIST,
        variables: params,
      });
      const todos = result.data.todos;

      this.setState({
        todos,
        loading: false,
      });
    } catch (err) {
      console.error(
        `An error ${err.message} occured while loading tasks for user ${
          params.userId
        }`,
      );
    }
  };
  componentDidMount() {
    const userId = parseInt(this.props.match.params.userId, 10);
    this.fetchTodoList({ userId });
  }
  render() {
    const { todos = [], loading } = this.state;
    return (
      <div className="todo_list">
        <Table columns={columns} dataSource={todos} loading={loading} />
      </div>
    );
  }
}

TodoList.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
  match: PropTypes.object,
};
export default withApollo(TodoList);
