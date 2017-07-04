import { FETCH_CREATED_SEASONS } from '../actions';

export default function(state=[], action){
  switch (action.type) {
    case FETCH_CREATED_SEASONS:
      return action.payload.data;
    default:
      return state;
  }
}
