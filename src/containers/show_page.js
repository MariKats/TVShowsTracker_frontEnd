import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchShow, deleteShow, fetchSeasons } from '../actions';

class ShowPage extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchShow(id);

    if (!this.props.show){
      return <p>Loading...</p>
    }
    this.props.fetchSeasons(this.props.show.tvmaze_id);
  }

  onDeleteClick(){
    const { id } = this.props.match.params;
    let callback = () => {this.props.history.push('/shows')}
    this.props.deleteShow(id, callback);
  }

    render() {
      const { show, seasons } = this.props;
      if(!show || !seasons){
        return null
      }
        return (
          <div>
            <div className="row text-center">
              <div className="col-sm-4">
                <h3>{show.name}</h3>
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
              <div className="col-sm-4 text-center">
                  {seasons.map((s)=> <p key={s.number}> Season {s.number} </p>)}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <button
                  className="btn-link center-block"
                  onClick={this.onDeleteClick.bind(this)}>
                  Delete Show
                </button>
              </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps({ shows, seasons }, ownProps) {
  return{ show: shows[ownProps.match.params.id],
  seasons };
}

export default connect(mapStateToProps, { fetchShow, deleteShow, fetchSeasons })(ShowPage)
