import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShow, deleteShow, fetchSeasons, fetchEpisodes } from '../actions';

class ShowPage extends Component {
  constructor(props){
  	super(props);
    this.state = {
      num: "",
      progress: 0
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

  handleClick(event) {
   this.setState({
     num: event.target.id,
   })
 }

  onCheckChange(event) {
    let index = event.target.id-1
    let numbEpisodes = this.props.seasons[index].episodeOrder
    let unit = 100/(parseInt(numbEpisodes, 10))
   this.setState({
     progress: this.state.progress += unit
   })
 }

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
                  {
                    seasons.map((s)=> {
                      if(s.premiereDate === null) {
                        return null
                      } else {
                        return (
                          <div>
                            <a onClick={this.handleClick.bind(this)}><p key={s.id} id={s.number}> Season {s.number}</p></a>
                            <div className="progress">
                              <div className="progress-bar" role="progressbar" aria-valuenow={`${this.state.progress.toString()}`} aria-valuemin="0" aria-valuemax="100" style={{width:`${this.state.progress.toString()}%`}}>
                              </div>
                            </div>
                          </div>
                        )
                      }
                    })
                  }
              </div>

              <div className="col-sm-4 text-left">

                    {episodes.filter((e) => e.season.toString() === this.state.num).map((e)=> {
                      return (
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" onChange={this.onCheckChange.bind(this)} id={e.season} key={e.id}/>{e.number}. {e.name}
                          </label>
                        </div>
                      )}
                    )}
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
