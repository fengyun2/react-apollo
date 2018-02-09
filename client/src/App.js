import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserList from './containers/User/list';
import TodoList from './containers/Todo/list';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/user/list" />} />
          <Route exact path="/user/list" component={UserList} />
          <Route exact path="/todos/:userId" component={TodoList} />
        </Switch>
      </div>
    );
  }
}

export default App;
