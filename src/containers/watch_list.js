import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShows } from '../actions/index';
import { Card, Image, Container } from 'semantic-ui-react';

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
  }

    render() {
      if(!this.props.shows){
        return (<p>Loading...</p>)
      }
        return (
          <Container fluid>
            <Card.Group itemsPerRow={5} centered>
                {_.map(this.props.shows, s=> this.renderShow(s))}
            </Card.Group>
          </Container>
        );
    }
}

function mapStateToProps({shows}) {
  return{shows}
}

export default connect(mapStateToProps, {fetchShows})(WatchList)
