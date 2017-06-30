import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createShow } from '../actions/index';
import PropTypes from 'prop-types';

class SearchPage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(){
    let image = this.props.searchedShow.image.medium
    let name = this.props.searchedShow.name
    let tvmaze_id = this.props.searchedShow.id
    let callback = () => {this.context.router.history.push('/shows')}
    this.props.createShow(name, image, tvmaze_id, callback)
  }

    render() {
      if (!this.props.searchedShow.image){
        return null
      }
      let image = this.props.searchedShow.image.medium

        return (
            <div>
              <img alt="" src={image}></img>
                <p><button onClick={this.handleClick} className="btn btn-secondary">Add to your watchlist</button></p>
            </div>
        );
    }
}

function mapStateToProps({ searchedShow }) {
  return { searchedShow };
}

export default connect(mapStateToProps, { createShow })(SearchPage);
