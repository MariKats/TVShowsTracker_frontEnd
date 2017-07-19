import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createShow, clearSearchedShow } from '../actions/shows';
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
    let {name, id} = this.props.searchedShow
    let callback = () => {this.context.router.history.push('/shows')}
    this.props.createShow(name, image, id, callback)
    this.props.clearSearchedShow()
  }

    render() {
      if (!this.props.searchedShow.image){
        return null
      }
      let image = this.props.searchedShow.image.original

        return (
          <div className='search-result'>
            <Card centered size="small">
              <Image src={image}/>
              <Card.Content>
                <Button onClick={this.handleClick} className="btn btn-secondary" attached='top'>Add to your watchlist</Button>
              </Card.Content>
            </Card>
          </div>
        );
    }
}

function mapStateToProps({ searchedShow }) {
  return { searchedShow };
}

export default connect(mapStateToProps, { createShow, clearSearchedShow }) (SearchPage);
