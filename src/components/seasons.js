import React from 'react';
import { connect } from 'react-redux';

function SeasonsList(props) {

  if (!props.seasons) {
    return <p>Loading...</p>
  }

  return (
  }
  )
}

function mapStateToProps({seasons}) {
  return{seasons}
}

export default connect(mapStateToProps)(SeasonsList)
