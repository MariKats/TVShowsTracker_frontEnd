import React,{Component} from 'react';
import { updateEpisode } from '../actions/episodes';
import { connect } from 'react-redux';

class EpisodesList extends Component {
  renderCheckBoxes(){
    const { num, episodes } = this.props;
    if(num && episodes){
      const episode_list = episodes.filter(e => e.season_number == num)
      const sorted = episode_list.sort((a, b) => a.number - b.number )
      const checks = sorted.map(e => {

        if(e.watched === true){
          console.log("true", e)

          return (
            <div key={e.id} className="checkbox">
              <label>
                <input type="checkbox" checked onChange={this.onCheckChange.bind(this)} id={e.id} />{e.number}. {e.name}
              </label>
            </div>
          )

        } else {

        return (
          <div className="checkbox">
            <label>
              <input type="checkbox" onChange={this.onCheckChange.bind(this)} id={e.id} key={e.id}/>{e.number}. {e.name}
            </label>
          </div>
        )}
      }
    )
    return checks

    } else {

    return <p>Click on a Season for a list of Episodes</p>
    }
  }

  onCheckChange(event) {
   const id = event.target.id
   const watched = event.target.checked
   this.props.updateEpisode(id, !!watched)
 }

    render() {
      return(
        <div>
        {this.renderCheckBoxes()}
        </div>
      )
    }
}

export default connect(null, { updateEpisode })(EpisodesList)
