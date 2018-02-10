import express from 'express';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

import { saveUser, updateUser, delUser, fetchUser } from '../controllers/user';
import { saveTodo, updateTodo, delTodo, fetchTodo } from '../controllers/todo';

// import schema from '../graphql/schema';
const schema = require('../graphql/schema');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    success: true,
    data: 'Welcome to Index Page',
  });
});

/* 用户操作 */
router
  .post('/save_user', saveUser)
  .post('/update_user', updateUser)
  .post('/del_user', delUser)
  .all('/user', fetchUser)
  .post('/save_todo', saveTodo)
  .post('/update_todo', updateTodo)
  .post('/del_todo', delTodo)
  .all('/todo', fetchTodo);

// The GraphQL endpoint
router.all('/graphql', async (req, res, next) => {
  await graphqlExpress({ schema })(req, res, next);
});

// GraphiQL, a visual editor for queries
router.get('/graphiql', async (req, res, next) => {
  await graphiqlExpress({ endpointURL: '/graphql' })(req, res, next);
});

// export default router;
module.exports = router;
