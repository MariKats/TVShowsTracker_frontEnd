import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSeries } from '../actions/index';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.state = {term: ''}
  }

  onInputChange(event) {
    this.setState({term: event.target.value})
  }

  onFormSubmit(event){
    event.preventDefault()
    this.props.fetchSeries(this.state.term)
    this.setState({term: ''})
  }

  render() {
    return (
        <form onSubmit={this.onFormSubmit} className="input-group">
            <input placeholder="Search for TV shows you want to add to your watchlist" className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}/>
            <span className="input-group-btn">
              <button type="submit" className="btn btn-secondary">Submit</button>
            </span>
        </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchSeries },dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);