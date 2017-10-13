import React from 'react';

import { connect } from 'react-redux';

import AppToolbar from '../components/AppToolbar';
import GameBoard from '../components/GameBoard';

import { createNewGame, endCurrentGame, wonCurrentGame, updateStats } from '../actions'

import * as GameStates from '../constants/GameStates';

import '../App.css';


let CurrentGame = null;

const AppContainer = ({games, stats, createNewGame, endCurrentGame, wonCurrentGame, updateStats}) => {
  
  if (!CurrentGame || (games.changed && 
        ((games.state === GameStates.ACTIVE && games.prevState !== games.state) ||  // new game
          (games.prevState === GameStates.ACTIVE && games.prevState !== games.state)))) {  // end game
    CurrentGame = () => (
      <GameBoard
        gameState={games}
        onWonGame={wonCurrentGame}
        onUpdateStats={updateStats} />
    )
  }

  return (
    <div className={'App' + (games.state === GameStates.ACTIVE ? ' started' : '')}>
      <AppToolbar
        stats={stats}
        gameState={games.state}
        onStartClick={() => createNewGame()} 
        onEndClick={() => endCurrentGame()} />
      <CurrentGame />
    </div>
  );

};

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
  { createNewGame, endCurrentGame, wonCurrentGame, updateStats }
)(AppContainer);
