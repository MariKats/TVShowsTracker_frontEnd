import { combineReducers } from 'redux';
import SearchedShowReducer from './reducer_searched_show'
import ShowsReducer from './reducer_shows'

const rootReducer = combineReducers({
  searchedShow: SearchedShowReducer,
  shows: ShowsReducer,
});

export default rootReducer;
