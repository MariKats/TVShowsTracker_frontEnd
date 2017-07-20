import React,{Component} from 'react';
import { updateEpisode } from '../actions/episodes';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class EpisodesList extends Component {
  renderCheckBoxes(){
    const { id, num, seasons } = this.props;
    if(num && seasons.length>0){
      const seasons_list = seasons.find(s => s.number == num && s.show.id == id)
      if (seasons_list){
        const episodes = seasons_list.episodes.sort((a, b) => a.number - b.number )
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

  onCheckChange(event) {
   const id = event.target.id
   const watched = event.target.checked
   this.props.updateEpisode(id, !!watched)
 }

 handleSelectAll(event){
   var inputs = document.querySelectorAll("input[type='checkbox']");
     for(var i = 0; i < inputs.length; i++) {
     inputs[i].checked = true;
     this.props.updateEpisode(inputs[i].id, true)
   }
 }

    render() {
      return(
        <div>
        {this.renderCheckBoxes()}
        <Button onClick={this.handleSelectAll.bind(this)}>Select All</Button>
        </div>
      )
    }
}

export default connect(null, { updateEpisode })(EpisodesList)
