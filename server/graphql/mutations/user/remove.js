import { GraphQLNonNull, GraphQLID } from 'graphql';

import { userType } from '../../types/user';

import mongoose from 'mongoose';
const User = mongoose.model('User');

export default {
  type: userType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    const delRes = User.findByIdAndRemove(params.id);
    if (!delRes) {
      throw new Error('删除用户失败');
    }
    return delRes;
  },
};
