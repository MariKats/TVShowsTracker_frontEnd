import { UPDATE_EPISODE } from '../actions';

export default function(state={}, action){
  console.log(action)
  switch (action.type) {
    case UPDATE_EPISODE:
      return action.payload.data;
    default:
      return state;
  }
}
