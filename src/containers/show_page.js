import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProgressBar from '../components/progress_bar'
import { Grid, Image, Button, Card, Rating, Divider } from 'semantic-ui-react'
import { fetchShow, deleteShow, updateRating } from '../actions/shows';
import { fetchSeasons, createSeason, fetchCreatedSeasons } from '../actions/seasons';
import { fetchEpisodes, createEpisode } from '../actions/episodes';
import SeasonsList from '../components/seasons_list';
import EpisodesList from '../components/episodes_list';
import '../style/index.css'

class ShowPage extends Component {
  constructor(props){
  	super(props);
    this.state = {
      num: ""
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchShow(id).then((show) => {
    const tvmaze_id = show.payload.data.tvmaze_id
    this.props.fetchSeasons(tvmaze_id)
    .then((seasons)=> seasons.payload.data.map(season => this.props.createSeason(id, season.number, season.episodeOrder)))
    .then(()=>this.props.fetchCreatedSeasons(id))
    .then(()=>this.props.fetchEpisodes(tvmaze_id))
    .then((episodes)=> {
        const find_season_id = (seasons_number) => this.props.created_seasons.find(season => season.number === seasons_number && season.show.id.toString() === id)
        episodes.payload.data.map(episode => {
            const season_id = find_season_id(episode.season)
            if (season_id){
            this.props.createEpisode(season_id.id, episode.season, episode.number, episode.name, false, episode.runtime)
          }
        })
      })
    })
  }

  componentDidUpdate(prevProps) {
    const id = this.props.match.params
    if (prevProps !== this.props) {
      this.props.fetchCreatedSeasons(id)
    }
  }

  handleClick(event) {
   this.setState({
     num: event.target.id,
   })
 }

  onDeleteClick(){
    const { id } = this.props.match.params;
    let callback = () => {this.props.history.push('/shows')}
    this.props.deleteShow(id, callback);
  }

  onClickRating(event, data){
    const { id } = this.props.match.params;
    this.props.updateRating(id, data.rating)
  }

    render() {
      const { show, seasons, episodes, created_seasons } = this.props;
      if(!show || !seasons){
        return null
      }
        return (
          <Grid columns={3} divided id="showpage">
            <Grid.Row >

            <Grid.Column>
              <Card centered size="small" style={{marginTop: 50, marginBottom: 50}}>
                <Image src={show.image} size="large"/>
                <Card.Content>
                  <Button attached="bottom"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Show
                  </Button>
                </Card.Content>
                <Card.Content extra>
                <div style={{marginLeft: 25, marginRight: 25}}>
                  <h2>Rating</h2>
                  <Rating icon='star' defaultRating={show.rating} maxRating={5} size='large' onRate={this.onClickRating.bind(this)}/>
                </div>
                </Card.Content>
                <Card.Content extra>
                  <div style={{marginLeft: 25, marginRight: 25}}>
                    <h2>Total Progress</h2>
                      <ProgressBar id={this.props.match.params.id} seasons={created_seasons}/>
                    </div>
                </Card.Content>
              </Card>
              </Grid.Column>

              <Grid.Column>
              <div style={{marginTop: 50, marginBottom: 30}}>
                <h1 style={{fontSize: "2em"}}>SEASONS</h1>
                  <SeasonsList seasons={seasons} handleClick={this.handleClick.bind(this)}/>
                </div>
              </Grid.Column>

              <Grid.Column>
              <div style={{marginTop: 50, marginBottom: 30}}>
                <h1 style={{fontSize: "2em"}}>EPISODES</h1>
                    <EpisodesList
                    id={this.props.match.params.id}
                    num={this.state.num}
                    seasons={created_seasons} />
              </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
    }
}

function mapStateToProps({ shows, created_seasons, seasons, episodes }, ownProps) {
  return{ show: shows[ownProps.match.params.id], created_seasons, seasons, episodes };
}

export default connect(mapStateToProps, { fetchShow, deleteShow, fetchSeasons, fetchEpisodes, createSeason, fetchCreatedSeasons, createEpisode, updateRating })(ShowPage)
