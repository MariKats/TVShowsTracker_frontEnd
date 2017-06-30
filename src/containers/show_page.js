import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShow, deleteShow, fetchSeasons, fetchEpisodes } from '../actions';

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
      this.props.fetchEpisodes(tvmaze_id)
      }
    )
  }

  handleClick(event){
   this.setState({num: event.target.id}, console.log(this.state.num)) }

  onDeleteClick(){
    const { id } = this.props.match.params;
    let callback = () => {this.props.history.push('/shows')}
    this.props.deleteShow(id, callback);
  }

    render() {
      const { show, seasons, episodes } = this.props;
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
                  {seasons.map((s)=> <a onClick={this.handleClick.bind(this)}><p key={s.id} id={s.number}> Season {s.number} </p></a>)}
              </div>
              <div className="col-sm-4 text-left">
                  {this.props.episodes.filter((e) => e.season.toString() === this.state.num).map((e)=> <p key={e.id}> S{e.season}:E{e.number} - {e.name} </p>)}
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps({ shows, seasons, episodes }, ownProps) {
  return{ show: shows[ownProps.match.params.id],
  seasons, episodes };
}

export default connect(mapStateToProps, { fetchShow, deleteShow, fetchSeasons, fetchEpisodes })(ShowPage)
