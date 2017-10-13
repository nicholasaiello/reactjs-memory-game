import React, { Component } from 'react';

import AppToolbar from '../components/AppToolbar';
import GameBoard from './GameBoard';

import * as GameStates from '../constants/GameStates';

import '../App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    console.log(props);
  }

  componentWillMount = () => {
    this.newGame();
  }

  newGame () {
    this.setState({
      game: () => (<GameBoard 
        gameState={this.props.gameState} />)
    });
  }

  // handleOnGameStart = () => {
  //   // this.setState({ gameStarted: true });
  // }

  // handleOnGameEnd = () => {
  //   if (window.confirm('Are you sure you want to stop playing?')) {
  //     setTimeout(() => {
  //       this.newGame();
  //     }, 1);
  //   }
  // }

  // handleOnGameStatsChange = (stats) => {
  //   this.setState({ stats: stats });
  // }

  render() {
    const CurrentGame = this.state.game;
    return (
      <div className={'App' + (this.props.gameState ? ' started' : '')}>
        <AppToolbar  />
        <CurrentGame />
      </div>
    );
  }
}

export default App;
