import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Radio } from 'antd';

const FormItem = Form.Item;

class addUser extends Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 8,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    return (
      <Modal
        visible={visible}
        title="添加用户"
        okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="first_name">
            {getFieldDecorator('first_name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your first_name!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="last_name">
            {getFieldDecorator('last_name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your last_name!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="email">
            {getFieldDecorator('email', {
              rules: [
                { type: 'email', message: 'The input is not valid email!' },
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="gender">
            {getFieldDecorator('gender', {
              initialValue: 'Male',
            })(
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="department">
            {getFieldDecorator('department')(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label="country">
            {getFieldDecorator('country')(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

addUser.propTypes = {
  visible: PropTypes.bool,
  onCreate: PropTypes.func,
  onCancel: PropTypes.func,
  form: PropTypes.object,
};

const WrappedAddUser = Form.create()(addUser);

export default WrappedAddUser;
