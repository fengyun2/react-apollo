import React, { Component } from 'react';

import { Form, DatePicker, Button, Input, Select, Row, Col } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class addUser extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      }
    }
    return ()
  }
}

const WrappedAddUser = Form.create()(addUser)

export default WrappedAddUser
