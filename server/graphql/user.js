import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLID, // 新增
} from 'graphql';

import mongoose from 'mongoose';

import { TodoType } from './todo';

const User = mongoose.model('User');

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Users in company',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    // id: { type: new GraphQLNonNull(GraphQLInt) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    department: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    // todo_count: {
    //   type: GraphQLInt,
    //   // resolve: user => {
    //   //   return sumBy(Todos, todo => (todo.userId === user.id ? 1 : 0));
    //   // }
    // },
    // todos: {
    //   type: new GraphQLList(TodoType),
    //   // resolve: (user, args) => {
    //   //   return filter(Todos, todo => todo.userId === user.id);
    //   // }
    // },
  }),
});

// 查询批量用户
export const users = {
  type: new GraphQLList(UserType),
  args: {},
  resolve(root, params, options) {
    return User.find({}).exec();
  },
};

// 查询单个用户
export const user = {
  type: UserType,
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID), // 参数不为空
    },
  },
  resolve(root, params, options) {
    return User.findOne({ _id: params.id }).exec();
  },
};
