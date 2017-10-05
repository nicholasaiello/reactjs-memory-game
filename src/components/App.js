import React, { Component } from 'react';

import AppToolbar from './AppToolbar';
import GameBoard from './GameBoard';

import '../App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { gameStarted: props.startGame || false, stats: {} };
  }

  handleOnGameStart = () => {
    this.setState({ gameStarted: true });
  }

  handleOnGameEnd = () => {
    if (window.confirm('Are you sure you want to stop playing?')) {
      this.setState({ gameStarted: false });
    }
  }

  handleOnGameStatsChange = (stats) => {
    this.setState({ stats: stats });
  }

  render() {
    return (
      <div className={"App" + (this.state.gameStarted ? ' started' : '')}>
        <AppToolbar 
          gameStarted={this.state.gameStarted} 
          gameStats={this.state.stats}
          onStartClick={() => this.handleOnGameStart()} 
          onEndClick={() => this.handleOnGameEnd()} />
        <GameBoard gameStarted={this.state.gameStarted} onStatsChange={(stats) => this.handleOnGameStatsChange(stats)} />
      </div>
    );
  }
}

export default App;
