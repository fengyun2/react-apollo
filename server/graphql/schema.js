import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import { todo, todos } from './todo';
import { user, users } from './user';

// 导出全部的GraphQLSchema模块

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'TodoAppSchema',
    fields: {
      todos,
      todo,
      users,
      user,
    },
  }),
});

// 注意这里不能用export default导出
module.exports = schema;
