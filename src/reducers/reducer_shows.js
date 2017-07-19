import _ from 'lodash';
import { FETCH_SHOWS, FETCH_SHOW, DELETE_SHOW } from '../actions/shows';

export default function(state={}, action){
  switch (action.type) {
    case FETCH_SHOW:
      return {...state, [action.payload.data.id]: action.payload.data};
    case FETCH_SHOWS:
      return _.mapKeys(action.payload.data, 'id');
    case DELETE_SHOW:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
