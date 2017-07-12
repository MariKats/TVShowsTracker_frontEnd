import _ from 'lodash';
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchShows, fetchCreatedEpisodes } from '../actions/index';
import { Card, Image, Container, Segment, List, Statistic } from 'semantic-ui-react';
import '../style/index.css'

class WatchList extends Component {
  renderShow(show){
    return (
      <Link to={`/shows/${show.id}`} key={show.id} >
        <img style={{margin: "9px"}} src={show.image} size="medium"/>
      </Link>
    )
  }

  renderWatchList(){
    const shows = _.filter(this.props.shows, s => s.episodes.filter(e=>e.watched === true).length === 0)
      if (shows){ return (
        shows.map(s=> this.renderShow(s))
      )}
      else {
        return (
          <p>Please add some shows to your watchlist</p>
        )
      }
  }

  componentDidMount() {
    this.props.fetchShows();
    this.props.fetchCreatedEpisodes();
  }

    render() {
      const total_minutes = this.props.created_episodes.filter(e=> e.watched === true).map(e=> e.time).reduce(function(a,b){return a + b}, 0)
      const total_hours = (total_minutes/60).toFixed(2)
      const total_days = (total_minutes/(60*24)).toFixed(2)
      const total_weeks = (total_minutes/(60*24*7)).toFixed(2)
      const total_months = (total_minutes/(60*24*30)).toFixed(2)
      const items = [{label: 'Minutes', value: total_minutes.toLocaleString() },{label: "Hours", value: total_hours.toString() },{label: 'Days', value: total_days.toString()}, {label: 'Weeks', value: total_weeks.toString()}, {label: 'Months', value: total_months.toString()}]

      if(!this.props.shows){
        return (<p>Loading...</p>)
      }
        return (
            <Container fluid>
              <Segment textAlign='center'>
                <strong>TOTAL TIME SPENT WATCHING TV</strong>
                <Statistic.Group widths='five' items={items} />
              </Segment>

              <Segment padded>
              <h2>WATCHLIST:</h2>
                <Image.Group>
                    {this.renderWatchList()}
                </Image.Group>
              </Segment>

              <Segment padded>
              <h2>CURRENTLY WATCHING:</h2>
                <Image.Group>
                    {_.filter(this.props.shows, s => s.episodes.length !== s.episodes.filter(e=>e.watched === true).length && s.episodes.filter(e=>e.watched === true).length > 0).map(s=> this.renderShow(s))}
                </Image.Group>
              </Segment>

              <Segment padded>
              <h2>FAVORITES:</h2>
              <Image.Group>
              {_.filter(this.props.shows, s=>s.rating>=4).sort((a, b) => a.rating - b.rating).slice(0, 8).map(s=> this.renderShow(s))}
              </Image.Group>
              </Segment>

              <Segment padded>
              <h2>COMPLETED:</h2>
                <Image.Group>
                    {_.filter(this.props.shows, s => s.episodes.length === s.episodes.filter(e=>e.watched === true).length && s.episodes.length > 0).map(s=> this.renderShow(s))}
                </Image.Group>
              </Segment>


            </Container>
        );
    }
}

function mapStateToProps({shows, created_episodes}) {
  return{shows, created_episodes}
}

export default connect(mapStateToProps, {fetchShows, fetchCreatedEpisodes})(WatchList)
