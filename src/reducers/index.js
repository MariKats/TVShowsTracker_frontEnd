import { combineReducers } from 'redux';
import SearchedShowReducer from './reducer_searched_show'
import ShowsReducer from './reducer_shows'
import SeasonsReducer from './reducer_seasons'
import CreatedSeasonsReducer from './reducer_created_seasons'
import CreatedEpisodesReducer from './reducer_created_episodes'
import EpisodesReducer from './reducer_episodes'

const rootReducer = combineReducers({
  searchedShow: SearchedShowReducer,
  shows: ShowsReducer,
  seasons: SeasonsReducer,
  episodes: EpisodesReducer,
  created_seasons: CreatedSeasonsReducer,
  created_episodes: CreatedEpisodesReducer
});

export default rootReducer;
