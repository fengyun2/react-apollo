import { GraphQLNonNull } from 'graphql';

import { userType, userInputType } from '../../types/user';

import mongoose from 'mongoose';
const User = mongoose.model('User');

export default {
  type: userType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(userInputType),
    },
  },
  resolve(root, params) {
    const opts = params.data;
    const user = new User(opts);
    const saveRes = user.save();

    if (!saveRes) {
      throw new Error('添加用户失败');
    }
    return saveRes;
  },
};
