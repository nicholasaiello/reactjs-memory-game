import { NEW_GAME, DEFAULT_CARD, FLIP_CARD, MATCH_CARD, NO_MATCH_CARD } from '../constants/ActionTypes';


const initialState = [];

export default function cards(state = initialState, action) {

  switch(action.type) {
    case DEFAULT_CARD:
      return {};
    case FLIP_CARD:
      return {}
    case MATCH_CARD:
      return {};
    case NO_MATCH_CARD:
      return {};
    case NEW_GAME:
      return [];
    default:
      return state;
  }

}
