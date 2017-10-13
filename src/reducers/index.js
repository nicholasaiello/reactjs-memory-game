import { combineReducers } from 'redux';

import games from './games';
import stats from './stats';
// import cards from './cards';

export default combineReducers({
  games,
  stats,
  // cards
});
