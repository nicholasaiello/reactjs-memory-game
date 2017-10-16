import * as types from '../constants/ActionTypes'

const newGame = (size = 12) => {
  return { type: types.NEW_GAME, size }
};

export const createNewGame = (size) => (dispatch, getState) => {
  dispatch(newGame(size));
};

const endGame = () => ({ type: types.END_GAME });

export const endCurrentGame = () => (dispatch, getState) => {
  if (window.confirm('Are you sure you want to stop playing?')) {
    // requestIdleCallback
    requestAnimationFrame(() => {
      dispatch(endGame());
    });
  }
};

export const wonCurrentGame = () => (dispatch, getState) => {
  window.alert('You won, congratulations!');
  // requestIdleCallback
  requestAnimationFrame(() => {
    dispatch(endGame());
  });
};

export const updateStats = (stat, value) => (dispatch, getState) => (
  dispatch({ type: types.UPDATE_STATS, stat, value })
);
