import { combineReducers } from 'redux';
import SearchedShowReducer from './reducer_searched_show'
import ShowsReducer from './reducer_shows'
import SeasonsReducer from './reducer_seasons'

const rootReducer = combineReducers({
  searchedShow: SearchedShowReducer,
  shows: ShowsReducer,
  seasons: SeasonsReducer
});

export default rootReducer;
