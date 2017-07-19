import { UPDATE_RATING } from '../actions/shows';

export default function(state={}, action){
  console.log(action)
  switch (action.type) {
    case UPDATE_RATING:
      return action.payload.data;
    default:
      return state;
  }
}
