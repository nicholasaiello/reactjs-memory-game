import React, { Component } from 'react';

import Snackbar from 'material-ui/Snackbar';

import Deck from './Deck';
import Card from './Card';

import * as GameStates from '../constants/GameStates';


class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.initialState, gamesPlayed: 0 };
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

  isGameActive = () => (
    this.props.gameState.state === GameStates.ACTIVE
  )

  hasWonGame = () => (
    this.isGameActive() && this.state.matches.length === this.props.deck.size
  )

  startGame = () => {
    this.props.deck.deal();
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

  handleStatChanged = (stat, value) => {
    this.props.onUpdateStats(stat, value);
  }

  handleSnackbarHide = () => {
    this.setState({snackbarOpen: false});
  }

  _checkGameState = () => {
    let state = this.state,
      props = this.props;

    if ((props.deck && !props.deck.dealt) && this.isGameActive()) {
      this.startGame();
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
          this.handleStatChanged('matches', this.state.matches.length / props.matchSetSize);
        }, props.matchedTimeout);
      } else {
        let attempts = this.state.attempts + 1;
        this.setState({attempts: attempts, chosenCards: []});

        setTimeout(() => {
          card1.toggleOpen();
          card2.toggleOpen();
          this.handleStatChanged('attempts', this.state.attempts);
        }, props.defaultTimeout);
      }
    }

    if (this.hasWonGame()) { // GAME OVER
      setTimeout(() => {
        props.onWonGame();
      }, props.defaultTimeout);
    }
  }

  render() {

    this._checkGameState();

    const state = this.state,
      { deck, columns } = this.props;

    let body;
    if (deck !== null) {
      body = deck.cards.map((n, i) => (
        <Card
          key={i + (deck.size)}
          value={n}
          index={i}
          onClick={(card) => this.handleCardClick(card)} />
      ));
    } else {
      body = (
        <section id={"intro"}>
          <h1>{"Welcome to the Memory Game!"}</h1>
          <p>{"Match all pairs & win. Press above to get started!"}</p>
        </section>
      );
    }

    const { snackbarOpen, snackbarCopy } = state;

    return (
      <div className={`board col-${this.props.columns}`}>
        {body}
        <Snackbar
          open={snackbarOpen}
          message={snackbarCopy}
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
