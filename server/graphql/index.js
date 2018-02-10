import { GraphQLSchema, GraphQLObjectType } from 'graphql';

// import mutations from './mutations';
import queries from './queries';

// 导出全部的GraphQLSchema模块

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    // name: 'Query',
    name: 'TodoAppSchema',
    fields: queries,
  }),
  // mutation: new GraphQLObjectType({
  //   name: 'Mutation',
  //   fields: mutations,
  // }),
});

// 注意这里不能用export default导出
module.exports = schema;
