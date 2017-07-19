import { FETCH_EPISODES } from '../actions/episodes';

export default function(state=[], action){
  switch (action.type) {
    case FETCH_EPISODES:
      return action.payload.data;
    default:
      return state;
  }
}
