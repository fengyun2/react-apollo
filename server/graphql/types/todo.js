import {
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID, // 新增
} from 'graphql';

import { userType } from './user';
// 定义日期时间类型
const metaType = new GraphQLObjectType({
  name: 'meta',
  fields: {
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    },
  },
});

// 定义Todo数据类型
export const todoType = new GraphQLObjectType({
  name: 'Todo',
  description: 'Task for todo',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    user: {
      type: userType,
    },
    meta: {
      type: metaType,
    },
  }),
});

// 定义Todo编辑类型
export const todoInputType = new GraphQLInputObjectType({
  name: 'TodoInput',
  description: 'Task for todoInput',
  fields: () => ({
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean },
    user: {
      type: GraphQLID,
    },
    meta: {
      type: metaType,
    },
  }),
});
