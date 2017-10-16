import { NEW_GAME, END_GAME } from '../constants/ActionTypes';
import Deck from '../components/Deck';

const initialState = null;

export default function cards(state = initialState, action) {

  switch(action.type) {
    case NEW_GAME:
      return Deck.create(action.size);
    case END_GAME:
      return null;
    default:
      return state;
  }

}
