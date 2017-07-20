import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchSearchedShow } from '../actions/shows';
import { Input, Button } from 'semantic-ui-react';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.state = {term: ''}
  }

  onInputChange(event, data) {
    this.setState({term: data.value}, console.log(data.value))
  }

  onButtonClick(){
    this.props.fetchSearchedShow(this.state.term)
    this.setState({term: ''})
  }

  render() {
    return (
      <Input focus className="searchbar"
        onChange={this.onInputChange}
        value={this.state.term}
        icon={<Button icon='search' onClick={this.onButtonClick}/>}
        placeholder='Search...'
      />
    );
  }
}

export default connect(null, { fetchSearchedShow })(SearchBar);
