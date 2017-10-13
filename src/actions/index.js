import * as types from '../constants/ActionTypes'

const newGame = () => {
  return { type: types.NEW_GAME }
};

export const createNewGame = () => (dispatch, getState) => {
  dispatch(newGame());
};

const endGame = () => ({ type: types.END_GAME });

export const endCurrentGame = () => (dispatch, getState) => {
  if (window.confirm('Are you sure you want to stop playing?')) {
    setTimeout(() => {
      dispatch(endGame());
    }, 1);
  }
};

const wonGame = () => ({ type: types.WON_GAME });

export const wonCurrentGame = () => (dispatch, getState) => {
  if (window.prompt("You won, congratulations!")) {
    setTimeout(() => {
      dispatch(endGame());
    }, 1);
  }
}

export const defaultCard = (card) => ({ type: types.DEFAULT_CARD, card });
export const flipCard = (card) => ({ type: types.FLIP_CARD, card });
export const matchCard = (card) => ({ type: types.MATCH_CARD, card });
// FIXME might not need
export const noMatchCard = (card) => ({ type: types.NO_MATCH_CARD, card });

export const updateStats = (stat, value) => (dispatch, getState) => (
  dispatch({ type: types.UPDATE_STATS, stat, value })
);
