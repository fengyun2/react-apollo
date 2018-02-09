import React from 'react';
import ReactDOM from 'react-dom';

// 引入apollo-client
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

import App from './App';

import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});
// client
//   .query({
//     query: gql`
//       {
//         books {
//           title
//           author
//         }
//       }
//     `,
//   })
//   .then(console.log);

client
  .query({
    query: gql`
      {
        users {
          id
          first_name
          last_name
          email
          department
          country
          todo_count
          todos {
            id
            title
            completed
          }
        }
      }
    `,
  })
  .then(console.log);
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById('root'),
);
registerServiceWorker();
