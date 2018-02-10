import { GraphQLNonNull, GraphQLID } from 'graphql';

import { todoType } from '../../types/todo';

import mongoose from 'mongoose';
const Todo = mongoose.model('Todo');

export default {
  type: todoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve(root, params) {
    const delRes = Todo.findByIdAndRemove(params.id);
    if (!delRes) {
      throw new Error('删除todo失败');
    }
    return delRes;
  },
};
