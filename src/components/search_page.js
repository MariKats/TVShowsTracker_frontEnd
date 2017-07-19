import React, { Component } from 'react';
import SearchBar from '../containers/search_bar'
import SearchResult from '../containers/search_result'

// import BackgroundImage from './background'

class SearchPage extends Component {
  render() {
    return (
      <div className="search-page">
        <SearchBar />
        <SearchResult />
      </div>
    );
  }
}

export default SearchPage
