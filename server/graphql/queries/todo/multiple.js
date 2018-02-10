// 批量查询

import {
  GraphQLList,
  GraphQLID, // 新增
} from 'graphql';

import { todoType } from '../../types/todo';

import mongoose from 'mongoose';
const Todo = mongoose.model('Todo');

export default {
  type: new GraphQLList(todoType),
  args: {
    userId: {
      name: 'user',
      type: GraphQLID,
    },
  },
  resolve(root, params) {
    const { userId } = params;
    const $where = {};
    if (userId) {
      $where.user = userId;
    }
    return Todo.find($where)
      .populate({
        path: 'user',
        select: 'id first_name gender country',
      })
      .exec();
  },
};
