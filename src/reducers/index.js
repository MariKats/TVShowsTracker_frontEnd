import { combineReducers } from 'redux';
import SearchedShowReducer from './reducer_searched_show'
import ShowsReducer from './reducer_shows'
import SeasonsReducer from './reducer_seasons'
import EpisodesReducer from './reducer_episodes'

const rootReducer = combineReducers({
  searchedShow: SearchedShowReducer,
  shows: ShowsReducer,
  seasons: SeasonsReducer,
  episodes: EpisodesReducer
});

export default rootReducer;
