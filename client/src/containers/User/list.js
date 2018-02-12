import React, { Component } from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import ApolloClient from 'apollo-client';
import { Link } from 'react-router-dom';

// 把ApolloClient 作为组件的属性直接访问
import { withApollo } from 'react-apollo';

import { Table, Button } from 'antd';

import './list.css';

import SearchInput from './search';
import AddUserForm from './components/addUser';

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
  {
    title: '操作',
    dataIndex: '',
    key: 'operation',
    render(text, record, index) {
      return (
        <Link to={`/todos/${record._id}`} key={index}>
          查看任务
        </Link>
      );
    },
  },
];

const FETCH_USER_LIST = gql`
  query TodoAppSchema($first_name: String, $last_name: String) {
    users(first_name: $first_name, last_name: $last_name) {
      _id
      first_name
      last_name
      email
      gender
      department
      country
    }
  }
`;

const ADD_USER = gql`
  mutation Mutation(
    $first_name: String!
    $last_name: String!
    $email: String!
    $gender: String
    $department: String
    $country: String
  ) {
    addUser(
      data: {
        first_name: $first_name
        last_name: $last_name
        email: $email
        gender: $gender
        department: $department
        country: $country
      }
    ) {
      _id
      first_name
      last_name
      email
    }
  }
`;

class UserList extends Component {
  state = {
    users: [],
    loading: false,
    addVisible: false,
    editVisible: false,
  };
  showAddModal = () => {
    this.setState({
      addVisible: true,
    });
  };
  showEditModal = () => {
    this.setState({
      editVisible: true,
    });
  };
  handleAddCancel = () => {
    this.setState({
      addVisible: false,
    });
  };
  handleEditCancel = () => {
    this.setState({
      editVisible: false,
    });
  };
  handleAddCreate = () => {
    const addForm = this.addForm;
    addForm.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      this.addUser(values);
      addForm.resetFields();
      this.setState({
        addVisible: false,
      });
    });
  };
  handleEditCreate = () => {
    const editForm = this.editForm;
    editForm.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);

      editForm.resetFields();
      this.setState({
        editVisible: false,
      });
    });
  };

  addFormRef = form => {
    this.addForm = form;
  };
  editFormRef = form => {
    this.editForm = form;
  };
  addUser = async (params = {}) => {
    const result = await this.props.client.mutate({
      mutation: ADD_USER,
      variables: params,
    });
    this.setState({
      users: [...this.state.users, result.data.addUser],
    });
    console.log('addUser: ', result);
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
        <header className="header clearfix">
          <SearchInput
            field="first_name"
            placeholder="请输入名字"
            style={{ width: 200 }}
            onSearch={this.fetchUserList}
          />
          <div className="add-btn-wrap">
            <Button type="primary" onClick={this.showAddModal}>
              添加用户
            </Button>
          </div>
        </header>
        <Table columns={columns} dataSource={users} loading={loading} />
        <AddUserForm
          ref={this.addFormRef}
          visible={this.state.addVisible}
          onCancel={this.handleAddCancel}
          onCreate={this.handleAddCreate}
        />
      </div>
    );
  }
}

UserList.propTypes = {
  client: PropTypes.instanceOf(ApolloClient).isRequired,
};
export default withApollo(UserList);
