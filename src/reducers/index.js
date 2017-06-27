import { combineReducers } from 'redux';
import SeriesReducer from './reducer_series'
import FavoritesReducer from './reducer_favorites'

const rootReducer = combineReducers({
  series: SeriesReducer,
  favorites: FavoritesReducer
});

export default rootReducer;
