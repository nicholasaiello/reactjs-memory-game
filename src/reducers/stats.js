import { UPDATE_STATS, NEW_GAME } from '../constants/ActionTypes';

const initialState = {
    attempts: 0,
    matches: 0
};

export default function stats(state = initialState, action) {

  switch(action.type) {
    case UPDATE_STATS:
      return { ...state, [action.stat]: action.value };
    case NEW_GAME:
      return initialState;
    default:
      return state;
  }

};
