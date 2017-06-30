import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShows } from '../actions/index';

class WatchList extends Component {
  renderShow(show){
    return (
      <Link to={`/shows/${show.id}`} key={show.id} >
        <img className="image" alt="" src={show.image}/>
       </Link>
    )
  }

  componentDidMount() {
    this.props.fetchShows();
  }

    render() {
      if(!this.props.shows){
        return (<p>Loading...</p>)
      }
        return (
          <div>
              {_.map(this.props.shows, s=> this.renderShow(s))}
          </div>
        );
    }
}

function mapStateToProps({shows}) {
  return{shows}
}

export default connect(mapStateToProps, {fetchShows})(WatchList)
