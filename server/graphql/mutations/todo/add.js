import { GraphQLNonNull } from 'graphql';

import { todoType, todoInputType } from '../../types/todo';

import mongoose from 'mongoose';
const Todo = mongoose.model('Todo');

export default {
  type: todoType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(todoInputType),
    },
  },
  resolve(root, params) {
    const opts = params.data;
    const todo = new Todo(opts);
    const saveRes = todo.save();

    if (!saveRes) {
      throw new Error('添加todo失败');
    }
    return saveRes;
  },
};
