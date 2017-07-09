import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import SearchPage from './search_page'
import NavBar from './nav_bar'
import WatchList from '../containers/watch_list';
import ShowPage from '../containers/show_page';
import LoginForm from '../containers/login_form';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Switch>
          <Route path='/shows/:id' component={ShowPage}></Route>
          <Route path='/shows' component={WatchList}></Route>
          <Route path='/login' component={LoginForm}></Route>
          <Route path='/' component={SearchPage}></Route>
        </Switch>
      </div>
    );
  }
}
