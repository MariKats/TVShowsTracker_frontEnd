import { FETCH_SEARCHED_SHOW, CLEAR_SEARCHED_SHOW } from '../actions/shows';

export default function(state={}, action){
  switch (action.type) {
    case FETCH_SEARCHED_SHOW:
      return action.payload.data;
    case CLEAR_SEARCHED_SHOW:
      return {};
    default:
      return state;
  }
}
