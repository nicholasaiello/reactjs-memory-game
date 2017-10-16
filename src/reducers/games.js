import { NEW_GAME, END_GAME } from '../constants/ActionTypes';

import * as GameStates from '../constants/GameStates';

const initialState = {
  state: GameStates.INACTIVE,
  prevState: GameStates.INACTIVE
};

export default function games(state = initialState, action) {
  switch(action.type) {
    case NEW_GAME:
      return { state: GameStates.ACTIVE, prevState: state.state, changed: true };
    case END_GAME:
      return { state: GameStates.ENDED, prevState: state.state, changed: true };
    default:
      return { ...state, changed: false };
  }

}
