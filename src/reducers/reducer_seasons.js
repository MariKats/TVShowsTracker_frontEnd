import { FETCH_SEASONS } from '../actions/seasons';

export default function(state=[], action){
  switch (action.type) {
    case FETCH_SEASONS:
      return action.payload.data;
    default:
      return state;
  }
}
