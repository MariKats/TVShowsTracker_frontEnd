import { FETCH_SERIES } from '../actions/index';

export default function(state=[], action){
  switch (action.type) {
    case FETCH_SERIES:
    console.log(action.payload.data.name)
      return [action.payload.data, ...state];
      break;
    default:
      return state;
  }
}
