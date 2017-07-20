import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import SearchResult from '../containers/search_result'

class SearchPage extends Component {
  render() {
    return (
      <div id="searchpage">
        <SearchBar />
        <SearchResult />
      </div>
    );
  }
}

export default SearchPage
