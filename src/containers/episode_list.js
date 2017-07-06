import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEpisodes, createEpisode } from '../actions/episodes';
import { Field, reduxForm } from 'redux-form'

class EpisodeList extends Component {
  constructor(props){
  	super(props);
    this.state = {
      progress: 0,
    }
  }

  componentDidMount() {
    const { id, tvmaze_id } = this.props.activeShow;

    this.props.fetchEpisodes(tvmaze_id).then(episodes => {
        const find_season_id = (seasons_number) => this.props.createdSeasons.find(season => season.number === seasons_number && season.show.id.toString() === id).id
        episodes.payload.data.map(episode => this.props.createEpisode(find_season_id(episode.season), episode.season, episode.number, episode.name))
      })
    }

  onCheckChange(event) {
    let numbEpisodes = this.props.episodes.length
    let unit = 100/(parseInt(numbEpisodes, 10))
   this.setState(function(previous){
     return{
      progress: this.state.progress += unit
     }
   })
 }

 renderEpisodes(e){
   return(
     <div className="checkbox">
       <label>
         <input type="checkbox" onChange={this.onCheckChange.bind(this)} id={e.season} key={e.id} />{e.number}. {e.name}
       </label>
     </div>
   )
 }

  render() {
    const { episodes, seasonId } = this.props;
    return (
      <div>
      {episodes.filter((e) => e.season.toString() === seasonId).map((e)=>this.renderEpisodes(e))}
      </div>
    )
  }
}


function mapStateToProps({  createdSeasons, episodes, activeShow, seasonId }) {
  return{  createdSeasons, episodes, activeShow, seasonId };
}

export default connect(mapStateToProps, { fetchEpisodes, createEpisode })(EpisodeList)
