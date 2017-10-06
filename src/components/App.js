import React, { Component } from 'react';

import AppToolbar from './AppToolbar';
import GameBoard from './GameBoard';

import '../App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { stats: {}, gameStarted: props.startGame || false };
  }

  componentWillMount = () => {
    this.newGame();
  }

  newGame () {
    this.setState({
      stats: {},
      gameStarted: false,
      game: () => (<GameBoard 
        gameStarted={this.state.gameStarted} 
        onRestartGame={() => this.handleOnGameEnd()}
        onStatsChange={this.handleOnGameStatsChange} />)
    });
  }

  handleOnGameStart = () => {
    this.setState({ gameStarted: true });
  }

  handleOnGameEnd = () => {
    if (window.confirm('Are you sure you want to stop playing?')) {
      setTimeout(() => {
        this.newGame();
      }, 1);
    }
  }

  handleOnGameStatsChange = (stats) => {
    this.setState({ stats: stats });
  }

  render() {
    const CurrentGame = this.state.game;
    return (
      <div className={'App' + (this.state.gameStarted ? ' started' : '')}>
        <AppToolbar 
          stats={this.state.stats}
          gameStarted={this.state.gameStarted}
          onStartClick={() => this.handleOnGameStart()} 
          onEndClick={() => this.handleOnGameEnd()} />
        <CurrentGame />
      </div>
    );
  }
}

export default App;
