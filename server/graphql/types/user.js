import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID, // 新增
} from 'graphql';

// import mongoose from 'mongoose';
// const User = mongoose.model('User');

// 定义查询的用户字段
export const userType = new GraphQLObjectType({
  name: 'User',
  description: 'Users in company',
  fields: () => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    department: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});

// 定义编辑的用户信息字段
export const userInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    department: { type: GraphQLString },
    country: { type: GraphQLString },
  }),
});
