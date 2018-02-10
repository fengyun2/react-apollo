import { GraphQLNonNull, GraphQLID } from 'graphql';

import { userType, userInputType } from '../../types/user';

import mongoose from 'mongoose';
const User = mongoose.model('User');

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType),
    },
  },
  resolve(root, params) {
    return User.findByIdAndUpdate(
      params.id,
      { $set: { ...params.data } },
      { new: true },
    ).catch(err => new Error('更新用户信息失败：', err));
  },
};
