import { GraphQLSchema, GraphQLObjectType } from "graphql";

import { todo, todos } from "./todo";
import { user } from "./user";

// 导出全部的GraphQLSchema模块

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "TodoAppSchema",
    fields: {
      todos,
      todo,
      user
    }
  })
});
