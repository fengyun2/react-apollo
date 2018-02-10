// 查询批量用户
import { GraphQLString, GraphQLList } from 'graphql';

import { userType } from '../../types/user';

import mongoose from 'mongoose';
const User = mongoose.model('User');

export default {
  type: new GraphQLList(userType),
  args: {
    first_name: {
      name: 'first_name',
      type: GraphQLString,
    },
    last_name: {
      name: 'last_name',
      type: GraphQLString,
    },
  },
  resolve(root, params) {
    const { first_name, last_name } = params;
    const $where = {};
    if (first_name) {
      $where.first_name = first_name;
    }
    if (last_name) {
      $where.last_name = last_name;
    }
    const users = User.find($where).exec();
    if (!users) {
      throw new Error('该用户不存在！');
    }
    return users;
  },
};
