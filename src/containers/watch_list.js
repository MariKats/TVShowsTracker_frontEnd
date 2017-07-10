import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShows, fetchCreatedEpisodes } from '../actions/index';
import { Card, Image, Container, Segment, List } from 'semantic-ui-react'

class WatchList extends Component {
  renderShow(show){
    return (
    <Card fluid>
      <Link to={`/shows/${show.id}`} key={show.id} >
        <Image src={show.image}/>
       </Link>
     </Card>
    )
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchCreatedEpisodes();
  }

    render() {
      const total_minutes = this.props.created_episodes.filter(e=> e.watched === true).map(e=> e.time).reduce(function(a,b){return a + b}, 0)

      if(!this.props.shows){
        return (<p>Loading...</p>)
      }
        return (
          <Container fluid>
            <Segment textAlign='center'>
              <p><strong>TOTAL TIME SPENT WATCHING TV</strong> | {total_minutes} minutes | {total_minutes/60} hours | {total_minutes/(60*24)} days | {total_minutes/(60*24*30)} months</p>
            </Segment>
            <Card.Group itemsPerRow={5} centered>
                {_.map(this.props.shows, s=> this.renderShow(s))}
            </Card.Group>
          </Container>
        );
    }
}

function mapStateToProps({shows, created_episodes}) {
  return{shows, created_episodes}
}

export default connect(mapStateToProps, {fetchShows, fetchCreatedEpisodes})(WatchList)
