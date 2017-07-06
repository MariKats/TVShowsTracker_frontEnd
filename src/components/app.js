import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import SearchPage from '../containers/search_page'
// import BackgroundImage from './background'

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchPage />
      </div>
    );
  }
}
