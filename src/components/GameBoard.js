import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

import Deck from './Deck';
import Card from './Card';


class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.initialState, gamesPlayed: 0, deck: null, started: props.gameStarted };
  }

  get initialState() {
    return {
      snackbarOpen: false,
      snackbarCopy: '',
      attempts: 0,
      chosenCards:[], 
      matches: []
    };
  }

  hasWonGame = () => (
    this.state.started && this.state.matches.length === (this.state.deck || []).size
  )

  startGame = () => {
    let deck = new Deck(this.props.rows * this.props.columns);
    deck.deal();

    this.setState({ deck: deck, started: true });
  }

  restartGame = () => {
    let deck = new Deck(this.props.rows * this.props.columns);
    deck.deal();

    this.setState({ 
      ...this.initialState, 
      gamesPlayed: (this.state.gamesPlayed + 1), 
      deck: deck, 
      started: false 
    });

    this.handleStatsChanged();
  }

  endGame = () => {
    this.setState({ ...this.initialState, deck: null, started: false });
  }

  showSnackbar = (copy) => {
    this.setState({ snackbarOpen: true, snackbarCopy: copy });
  }

  handleCardClick = (card) => {
    let chosenCards = this.state.chosenCards;
    if (chosenCards.length > this.props.matchLimit) {
      // too many overturned cards. ignore
      return;
    }

    chosenCards.push(card);

    this.setState({ chosenCards: chosenCards });
  }

  handleStatsChanged = () => {
    this.props.onStatsChange({
      attempts: this.state.attempts,
      matches: (this.state.matches.length / this.props.matchSetSize) >> 0
    });
  }

  handleSnackbarHide = () => {
    this.setState({snackbarOpen: false});
  }

  _checkGameState = () => {
    let state = this.state;

    if (!state.deck && !state.started && this.props.gameStarted) {  // game started
      this.startGame();
      return;
    } else if (state.started && !this.props.gameStarted) {  // game ended
      this.restartGame();
      return;
    }
    
    // we have a pair
    if (state.chosenCards.length === this.props.matchSetSize) {
      let card1 = state.chosenCards[0],
        card2 = state.chosenCards[1];

      if (card1.value === card2.value) {
        this.showSnackbar('You got a match!');

        let matches = state.matches;
        matches = matches.concat(state.chosenCards);
        this.setState({matches: matches, chosenCards: []});

        setTimeout(() => {
          card1.markAsMatched();
          card2.markAsMatched();
          this.handleStatsChanged();
        }, this.props.matchedTimeout);
      } else {
        let attempts = this.state.attempts + 1;
        this.setState({attempts: attempts, chosenCards: []});

        setTimeout(() => {
          // this.showSnackbar('Not a match. Try again.');
          card1.toggleOpen();
          card2.toggleOpen();
          this.handleStatsChanged();
        }, this.props.defaultTimeout);
      }
    }

    if (this.hasWonGame()) { // GAME OVER
      this.setState({ started: false });
      setTimeout(() => {
        if (window.confirm("You won! Would you like to play again?")) {
          this.restartGame();
        }
      }, this.props.defaultTimeout);
    }
  }

  render() {

    this._checkGameState();

    let state = this.state, body;

    if (state.deck !== null) {
      body = state.deck.cards.map((n, i) => (
        <Card 
          key={i + (state.deck.size * state.gamesPlayed)}
          value={n}
          index={i} 
          onClick={(card) => this.handleCardClick(card)} />
      ));
    } else {
      body = (<section id="intro">
        <h1>{"Welcome to the Memory Game!"}</h1>
        <p>{"Match all pairs & win. Press above to get started!"}</p>
      </section>);
    }

    return (
      <div className={`board col-${this.props.columns}`}>
        {body}
        <Snackbar
          open={state.snackbarOpen}
          message={state.snackbarCopy}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarHide} />
      </div>
    )
  }

};

/**
 * limit: max card value, if M = columns and N = rows * columns, M < limit < N
 */
GameBoard.defaultProps = {
  rows: 4,
  columns: 6,
  limit: 12,
  matchSetSize: 2,
  matchedTimeout: 1500,
  defaultTimeout: 500
};

export default GameBoard;
