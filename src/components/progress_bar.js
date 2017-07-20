import React,{Component} from 'react';

export default class ProgressBar extends Component {

  renderProgressBar(){
    const { id, seasons } = this.props
    if(seasons.length > 0){
    const seasons_list = seasons.filter(s=>s.show.id == id)
    if (seasons) {
      const episodes = seasons_list.map(s=> s.episodes).reduce(function(a,b){ return a.concat(b)}, []).filter(e=>e.watched === true)
      const total = seasons_list.map(s=> s.episodes.length).reduce(function(a, b){return a+b})
      const watched = episodes.length
      const progress = (watched/total)*100
      return(
        <div className="progress fluid">
          <div className="progress-bar" role="progressbar"
           aria-valuenow={`${progress}`} aria-valuemin="0" aria-valuemax="100" style={{width:`${progress}%`}}>
          </div>
        </div>
        )
      }
    }
  }

    render() {
        return (
          <div>
            { this.renderProgressBar() }
          </div>
        );
    }
}
