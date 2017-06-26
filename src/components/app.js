import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import WatchList from '../containers/watchlist'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WatchList />
      </div>
    );
  }
}
