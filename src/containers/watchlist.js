import React, {Component} from 'react';
import {connect} from 'react-redux';

class WatchList extends Component {
  renderSeries(show){
    return(
      <tr key={show.id}>
        <td>{show.name}</td>
        <td>{show.summary}</td>
      </tr>
    );
  }

    render() {
      if (!this.props.series){
      return <div>danger...</div>
    }
        return (
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.series.map(this.renderSeries)}
                </tbody>
            </table>
        );
    }
}

function mapStateToProps({ series }) {
  return { series };
}

export default connect(mapStateToProps)(WatchList);
