import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import SearchedShow from '../containers/searched_show'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchedShow />
      </div>
    );
  }
}
