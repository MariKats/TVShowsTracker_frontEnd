import { SET_ACTIVE_SHOW } from '../actions/shows';

export default function(state={}, action){
  console.log(action)
  switch (action.type) {
    case SET_ACTIVE_SHOW:
      return action.payload.data;
    default:
      return state;
  }
}
