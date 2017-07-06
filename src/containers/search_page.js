import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createShow, clearSearchedShow } from '../actions/index';
import PropTypes from 'prop-types';
import { Image, Card, Button } from 'semantic-ui-react';

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
    this.props.clearSearchedShow()
  }

    render() {
      if (!this.props.searchedShow.image){
        return null
      }
      let image = this.props.searchedShow.image.original

        return (
            <Card centered size="small">
              <Image src={image}/>
              <Card.Content>
              <Button onClick={this.handleClick} className="btn btn-secondary" attached='top'>Add to your watchlist</Button>
              </Card.Content>
            </Card>
        );
    }
}

function mapStateToProps({ searchedShow }) {
  return { searchedShow };
}

export default connect(mapStateToProps, { createShow, clearSearchedShow })(SearchPage);
