import { GraphQLNonNull, GraphQLID } from 'graphql';

import { todoType, todoInputType } from '../../types/todo';

import mongoose from 'mongoose';
const Todo = mongoose.model('Todo');

export default {
  type: todoType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID),
    },
    data: {
      name: 'data',
      type: new GraphQLNonNull(todoInputType),
    },
  },
  resolve(root, params) {
    return Todo.findByIdAndUpdate(
      params.id,
      { $set: { ...params.data } },
      { new: true },
    ).catch(err => new Error('更新todo失败：', err));
  },
};
