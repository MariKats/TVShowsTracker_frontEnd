import React from 'react';

const ProgressBar = ({id, seasons}) => {
  if(seasons){
  const seasons_list = seasons.filter(s=>s.show.id == id)
  if (seasons) {
    const episodes = seasons_list.map(s=> s.episodes).reduce(function(a,b){ return a.concat(b)}, []).filter(e=>e.watched === true)
    const total = seasons_list.map(s=> s.episodes.length).reduce(function(a, b){return a+b})
    const watched = episodes.length
    const progress = (watched/total)*100
    return(
      <div className="progress-bar" role="progressbar"
       aria-valuenow={`${progress}`} aria-valuemin="0" aria-valuemax="100" style={{width:`${progress}%`}}>
      </div>
      )
    }
  }
}

export default ProgressBar;
