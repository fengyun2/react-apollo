import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// 引入apollo-client
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import gql from 'graphql-tag';

import './index.css';

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

// client
//   .query({
//     query: gql`
//       {
//         users(first_name: "Sonny", last_name: "Read") {
//           id
//           first_name
//           last_name
//           email
//           department
//           country
//           todo_count
//           todos {
//             id
//             title
//             completed
//           }
//         }
//         todos {
//           id
//           title
//         }
//       }
//     `,
//   })
//   .then(console.log)
//   .catch(err => {
//     console.log('服务器错误：', err);
//   });
ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
registerServiceWorker();
