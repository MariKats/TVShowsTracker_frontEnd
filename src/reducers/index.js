import { combineReducers } from 'redux';
import SearchedShowReducer from './reducer_searched_show'
import FavoritesReducer from './reducer_favorites'

const rootReducer = combineReducers({
  searchedShow: SearchedShowReducer,
  favorites: FavoritesReducer,
});

export default rootReducer;
