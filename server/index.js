// require('babel-register');
require("@babel/polyfill");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// import GraphqlRouter from "./router";
// import "./mongodb";
const GraphqlRouter = require("./router");

require("./mongodb");

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

app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "1mb" }));

app.use(GraphqlRouter);

// Start the server
app.listen(4000, () => {
  console.log("Go to http://localhost:4000/graphiql to run queries!");
});
