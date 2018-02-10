import express from 'express';
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

import { saveUser, updateUser, fetchUser } from '../controllers/user';
import { saveTodo, fetchTodo } from '../controllers/todo';

import schema from '../graphql/schema';

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({
    success: true,
    data: 'Welcome to Index Page',
  });
});

/* 用户操作 */
router
  .post('/save_user', saveUser)
  .post('/update_user', updateUser)
  .all('/user', fetchUser)
  .post('/save_todo', saveTodo)
  .all('/todo', fetchTodo);

// The GraphQL endpoint
router.all('/graphql', async (req, res, next) => {
  await graphqlExpress({ schema });
});

// GraphiQL, a visual editor for queries
router.all('/graphiql', async (req, res, next) => {
  await graphiqlExpress({ endpointURL: '/graphql' });
});

// export default router;
module.exports = router;
