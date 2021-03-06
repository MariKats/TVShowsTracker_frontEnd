import { FETCH_CREATED_EPISODES } from '../actions/episodes';

export default function(state=[], action){
  switch (action.type) {
    case FETCH_CREATED_EPISODES:
      return action.payload.data;
    default:
      return state;
  }
}
