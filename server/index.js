// require('babel-register');
require('@babel/polyfill');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

require('./mongodb');
// const GraphqlRouter = require('./router');
const schema = require('./graphql/schema');

// import GraphqlRouter from "./router";
// import "./mongodb";

// const { makeExecutableSchema } = require('graphql-tools');
// const schema = require('./schema');

// Some fake data
// const books = [
//   {
//     title: "Harry Potter and the Sorcerer's stone",
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// The GraphQL schema in string form
// const typeDefs = `
//   type Query { books: [Book] }
//   type Book { title: String, author: String }
// `;

// The resolvers
// const resolvers = {
//   Query: { books: () => books },
// };

// Put together a schema
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

// Initialize the app
const app = express();
app.use(cors());
// app.use(bodyParser.text({ type: 'application/graphql' }));

// app.use(bodyParser.json({ limit: '1mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// app.use(GraphqlRouter);

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), async (req, res, next) => {
  await graphqlExpress({ schema })(req, res, next);
});
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', async (req, res, next) => {
  await graphiqlExpress({ endpointURL: '/graphql' })(req, res, next);
});
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries!');
});
