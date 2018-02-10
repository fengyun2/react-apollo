// 根据id查询单条todo数据

import {
  GraphQLNonNull,
  GraphQLID, // 新增
} from 'graphql';

import { todoType } from '../../types/todo';

import mongoose from 'mongoose';
const Todo = mongoose.model('Todo');

export default {
  type: todoType,
  // 传递进来的参数
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID), // 参数不为空
    },
  },
  resolve(root, params) {
    return Todo.findOne({ _id: params.id })
      .populate({
        path: 'user',
        select: 'id first_name gender country',
      })
      .exec(); // 查询单条数据
  },
};
