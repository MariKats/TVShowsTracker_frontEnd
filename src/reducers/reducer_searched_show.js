import { FETCH_SEARCHED_SHOW } from '../actions/index';

export default function(state={}, action){
  switch (action.type) {
    case FETCH_SEARCHED_SHOW:
      return action.payload.data;
    default:
      return state;
  }
}
