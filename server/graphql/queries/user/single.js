// 查询单个用户
import {
  GraphQLNonNull,
  GraphQLID, // 新增
} from 'graphql';

import { userType } from '../../types/user';

import mongoose from 'mongoose';
const User = mongoose.model('User');
export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID), // 参数不为空
    },
  },
  resolve(root, params) {
    // return User.findOne({ _id: params.id }).exec();
    return User.findById(params.id).exec();
  },
};
