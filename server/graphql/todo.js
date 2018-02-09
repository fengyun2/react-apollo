import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLID // 新增
} from "graphql";

import mongoose from "mongoose";

import { UserType } from "./user";

const Todo = mongoose.model("Todo"); // 引入Todo模块

// 定义日期时间类型
const metaType = new GraphQLObjectType({
  name: "meta",
  fields: {
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
});

// 定义Todo数据类型
export const TodoType = new GraphQLObjectType({
  name: "todo",
  description: "Task for user",
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    // id: { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    user: {
      type: UserType
      // resolve: (todo, args) => {
      //   return find(Users, user => user.id === todo.userId);
      // }
    },
    meta: {
      type: metaType
    }
  })
});

// 批量查询
export const todos = {
  type: new GraphQLList(TodoType),
  args: {},
  resolve(root, params, options) {
    return Todo.find({})
      .populate({
        path: "user",
        select: "id first_name gender country"
      })
      .exec();
  }
};

// 根据id查询单条todo数据
export const todo = {
  type: TodoType,
  // 传递进来的参数
  args: {
    id: {
      name: "id",
      type: new GraphQLNonNull(GraphQLID) // 参数不为空
    }
  },
  resolve(root, params, options) {
    return Todo.findOne({ _id: params.id })
      .populate({
        path: "user",
        select: "id first_name gender country"
      })
      .exec(); // 查询单条数据
  }
};
