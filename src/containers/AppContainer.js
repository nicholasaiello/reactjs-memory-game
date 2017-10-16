import React from 'react';

import { connect } from 'react-redux';

import AppToolbar from '../components/AppToolbar';
import GameBoardContainer from './GameBoardContainer';

import { createNewGame, endCurrentGame } from '../actions'

import * as GameStates from '../constants/GameStates';

import '../App.css';

let CurrentGame = null;

const AppContainer = ({ games, stats, createNewGame, endCurrentGame }) => {

  if (!CurrentGame || (games.changed &&
        ((games.state === GameStates.ACTIVE && games.prevState !== games.state) ||  // new game
          (games.prevState === GameStates.ACTIVE && games.prevState !== games.state)))) {  // end game
    CurrentGame = () => (
      <GameBoardContainer />
    )
  }

  return (
    <main className={'App' + (games.state === GameStates.ACTIVE ? ' started' : '')}>
      <AppToolbar
        stats={stats}
        gameState={games.state}
        onStartClick={() => createNewGame(24)}
        onEndClick={() => endCurrentGame()} />
      <CurrentGame />
    </main>
  );

};

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  { createNewGame, endCurrentGame }
)(AppContainer);
