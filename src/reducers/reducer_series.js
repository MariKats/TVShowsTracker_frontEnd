import { FETCH_SERIES } from '../actions/index';

export default function(state={}, action){
  switch (action.type) {
    case FETCH_SERIES:
      return action.payload.data;
      break;
    default:
      return state;
  }
}
