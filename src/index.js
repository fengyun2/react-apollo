import React from "react";
import ReactDOM from "react-dom";

// 引入apollo-client
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import App from "./App";

import registerServiceWorker from "./registerServiceWorker";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://q80vw8qjp.lp.gql.zone/graphql" }),
  cache: new InMemoryCache()
});
client.query({ query: gql`{ hello }` }).then(console.log);
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,

  document.getElementById("root")
);
registerServiceWorker();
