import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'
import { fetchShow, deleteShow, fetchSeasons, fetchEpisodes, createSeason, fetchCreatedSeasons, createEpisode, updateEpisode } from '../actions';

class ShowPage extends Component {
  constructor(props){
  	super(props);
    this.state = {
      num: "",
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchShow(id).then((show) => {
    const tvmaze_id = show.payload.data.tvmaze_id
    this.props.fetchSeasons(tvmaze_id)
    .then((seasons)=> seasons.payload.data.map(season => this.props.createSeason(id, season.number, season.episodeOrder)))
    .then(()=>this.props.fetchCreatedSeasons()).then(res => console.log(res))
    .then(()=>this.props.fetchEpisodes(tvmaze_id))
    .then((episodes)=> {
      if(this.props.created_seasons){
        const find_season_id = (seasons_number) => this.props.created_seasons.find(season => season.number === seasons_number && season.show.id.toString() === id)
        episodes.payload.data.map(episode => {
            const season_id = find_season_id(episode.season).id
            this.props.createEpisode(season_id, episode.season, episode.number, episode.name, false)
        })
      }
      })
    })
  }

  handleClick(event) {
   this.setState({
     num: event.target.id,
   })
 }

  onCheckChange(event) {
   const id = event.target.id
   const watched = event.target.checked
   this.props.updateEpisode(id, !!watched).then(res => console.log(res))
 }

  onDeleteClick(){
    const { id } = this.props.match.params;
    let callback = () => {this.props.history.push('/shows')}
    this.props.deleteShow(id, callback);
  }

  createCheckboxes(){
    const { id } = this.props.match.params;
    console.log("createBoxes=====",this.state.num, this.props.created_seasons);
    if(this.state.num && this.props.created_seasons.length>0){
      console.log("true true");
    const episodes = this.props.created_seasons.find(s => s.number == this.state.num && s.show.id == id).episodes.sort((a, b) => a.number - b.number )
    const checks = episodes.map((e)=> {
      if(e.watched === true){
        console.log("watched === true", e)
        return (
          <div className="checkbox">
            <label>
              <input type="checkbox" checked onChange={this.onCheckChange.bind(this)} id={e.id} key={e.id}/>{e.number}. {e.name}
            </label>
          </div>
        )} else {
          console.log("watched === false", e)
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
}

renderProgressBar(){
  console.log("progressbar=======", this.state.num, this.props.created_seasons)
  if(this.state.num && this.props.created_seasons.length>0){
  const { id } = this.props.match.params;
  const episodes = this.props.created_seasons.find(s => s.number == this.state.num && s.show.id == id).episodes
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



    render() {
      const { show, seasons, episodes, created_seasons } = this.props;
      if(!show || !seasons){
        return null
      }
        return (
          <div>
            <div className="row">
              <div className="col-sm-4 text-center">
                <button
                  className="btn-link"
                  onClick={this.onDeleteClick.bind(this)}>
                  Delete Show
                </button>
              </div>
              <div className="col-sm-4">
                <h3>Seasons</h3>
              </div>
              <div className="col-sm-4">
                <h3>Episodes</h3>
              </div>
            </div>

            <div className="row">

              <div className="col-sm-4">
                <img className="img-responsive center-block" alt="" src={show.image} />
              </div>

              <div className="col-sm-4 text-left">
                  {
                    seasons.map((s)=> {
                      if(s.premiereDate === null) {
                        return null
                      } else {
                        return (
                          <div>
                            <a onClick={this.handleClick.bind(this)}><p key={s.id} id={s.number}> Season {s.number}</p></a>
                          </div>
                        )
                      }
                    })
                  }
                  <h3>Progress</h3>
                  <div className="progress">
                    {this.renderProgressBar()}
                  </div>
              </div>

              <div className="col-sm-4 text-left">
                  {this.createCheckboxes()}
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps({ shows, seasons, created_seasons, episodes }, ownProps) {
  return{ show: shows[ownProps.match.params.id],
  seasons, created_seasons, episodes };
}

export default connect(mapStateToProps, { fetchShow, deleteShow, fetchSeasons, fetchEpisodes, createSeason, fetchCreatedSeasons, createEpisode, updateEpisode })(ShowPage)
