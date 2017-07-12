import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Button, Card, Rating, Divider } from 'semantic-ui-react'
import { fetchShow, deleteShow, fetchSeasons, fetchEpisodes, createSeason, fetchCreatedSeasons, createEpisode, updateEpisode, updateRating } from '../actions';
import SeasonsList from '../components/seasons_list';

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
    .then(()=>this.props.fetchCreatedSeasons(id)).then(res => console.log(res))
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

  onCheckChange(event) {
   const id = event.target.id
   const watched = event.target.checked
   this.props.updateEpisode(id, !!watched)
 }

  onDeleteClick(){
    const { id } = this.props.match.params;
    let callback = () => {this.props.history.push('/shows')}
    this.props.deleteShow(id, callback);
  }

  createCheckboxes(){
    const { id } = this.props.match.params;
    if(this.state.num && this.props.created_seasons.length>0){
    const seasons = this.props.created_seasons.find(s => s.number == this.state.num && s.show.id == id)
    if (seasons){
      const episodes = seasons.episodes.sort((a, b) => a.number - b.number )
      const checks = episodes.map((e)=> {
        if(e.watched === true){
          return (
            <div className="checkbox">
              <label>
                <input type="checkbox" checked onChange={this.onCheckChange.bind(this)} id={e.id} key={e.id}/>{e.number}. {e.name}
              </label>
            </div>
          )} else {
        return (
          <div className="checkbox">
            <label>
              <input type="checkbox" onChange={this.onCheckChange.bind(this)} id={e.id} key={e.id}/>{e.number}. {e.name}
            </label>
          </div>
        )}
      })
      return checks
    }
  } else {
    return(
      <p>Click on a Season for a list of Episodes</p>
    )
  }
}

renderProgressBar(){
  if(this.state.num && this.props.created_seasons.length>0){
  const { id } = this.props.match.params;
  const seasons = this.props.created_seasons.find(s => s.number == this.state.num && s.show.id == id)
  if (seasons) {
    const episodes = seasons.episodes
    const total = episodes.length
    const watched = episodes.filter(e => e.watched === true).length
    const progress = (watched/total)*100
    return(
      <div className="progress-bar" role="progressbar"
       aria-valuenow={`${progress}`} aria-valuemin="0" aria-valuemax="100" style={{width:`${progress}%`}}>
      </div>
      )
    }
  }
}

  onClickRating(event, data){
    const { id } = this.props.match.params;
    this.props.updateRating(id, data.rating).then(res => console.log(res))
  }

  handleSelectAll(event){
    var inputs = document.querySelectorAll("input[type='checkbox']");
      for(var i = 0; i < inputs.length; i++) {
      inputs[i].checked = true;
      this.props.updateEpisode(inputs[i].id, true)
    }
  }

    render() {
      const { show, seasons, episodes, created_seasons } = this.props;
      if(!show || !seasons){
        return null
      }
        return (
          <Grid columns={3} divided style={{height: "100vh"}}>
            <Grid.Row style={{background: "#D3D3D3"}}>

            <Grid.Column>
              <Card centered size="small" style={{marginTop: 30, marginBottom: 30}}>
                <Image src={show.image} size="large"/>
                <Card.Content>
                  <Button attached="bottom"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Show
                  </Button>
                </Card.Content>
                <Card.Content extra>
                  Rate Show: <Rating icon='star' defaultRating={this.props.show.rating} maxRating={5} size='big' onRate={this.onClickRating.bind(this)}/>
                </Card.Content>
              </Card>
              <Divider />
                <div style={{marginLeft: 40, marginRight: 25}}>
                  <h2>Season Progress</h2>
                  <div className="progress fluid">
                    {this.renderProgressBar()}
                  </div>
                </div>
              </Grid.Column>

              <Grid.Column>
                <h2>Seasons</h2>
                  <SeasonsList seasons={seasons} handleClick={this.handleClick.bind(this)}/>
              </Grid.Column>

              <Grid.Column>
                <h2>Episodes</h2>
                    {this.createCheckboxes()}
                    <Button onClick={this.handleSelectAll.bind(this)}>Select All</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        );
    }
}

function mapStateToProps({ shows, seasons, created_seasons, episodes }, ownProps) {
  return{ show: shows[ownProps.match.params.id],
  seasons, created_seasons, episodes };
}

export default connect(mapStateToProps, { fetchShow, deleteShow, fetchSeasons, fetchEpisodes, createSeason, fetchCreatedSeasons, createEpisode, updateEpisode, updateRating })(ShowPage)
