import React from 'react';

import { connect } from 'react-redux';

import GameBoard from '../components/GameBoard';

import { createNewGame, wonCurrentGame, updateStats } from '../actions'

const GameBoardContainer = ({ games, cards, createNewGame, wonCurrentGame, updateStats }) => {
  return <GameBoard
          gameState={games}
          deck={cards}
          onCreateNewGame={() => createNewGame(24)}
          onWonGame={wonCurrentGame}
          onUpdateStats={updateStats} />;
};

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  { createNewGame, wonCurrentGame, updateStats }
)(GameBoardContainer);
