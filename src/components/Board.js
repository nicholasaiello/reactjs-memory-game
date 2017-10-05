import React, { Component } from 'react';

import Card from './Card';


class Board extends Component {

	constructor(props) {
		super(props);

    this.state = { chosenCards:[], matches: [], cards: [], started: false };
	}

  componentDidMount = () => {
    this.init();
  }

  componentWillUnmount = () => {
    
  }

  init = () => {
    let cards = this.deal();
    this.setState({ cards: cards, started: true });
  }

  _shuffle = (cards = [], shuffles = 5) => {
    // make sure chosen cards is empty
    if (this.state.matches.length) {
      alert("Can't shuffle the deck during an active game.");
      return cards;
    }

    let shuffled = cards.slice(),
      size = shuffled.length;

    for (let i = 0; i < shuffles; i++) {
        for ( let j = 0; j < size; j++) {
            let rand = Math.floor(Math.random() * size);
            let value = shuffled[j];
            shuffled[j] = shuffled[rand];
            shuffled[rand] = value;
        }
    }

    return shuffled;
  }

  _checkGameState = () => {
    console.log('_checkGameState', this.state.chosenCards);
    let state = this.state;

    if (state.chosenCards.length == this.props.matchLimit) {
      let card1 = state.chosenCards[0],
        card2 = state.chosenCards[1];

      if (card1.getValue() === card2.getValue()) {
        alert('MATCH!');
        let matches = state.matches;
        matches = matches.concat(state.chosenCards);

        this.setState({matches: matches, chosenCards: []});
      } else {
        setTimeout(() => {
          card1.toggleOpen();
          card2.toggleOpen();

          this.setState({chosenCards: []});
        }, 250);

        alert('not a match. try again.')
      }
    }

    if (state.started && state.matches.length === state.cards.length) {
      // GAME OVER
      if (window.confirm("You won! Would you like to play again?")) {
        this.redeal();
      }
    }
  }

  handleCardClick = (card) => {
    let chosenCards = this.state.chosenCards;
    if (chosenCards.length > this.props.matchLimit) {
      // ERROR
      return;
    }

    chosenCards.push(card);

    this.setState({ chosenCards: chosenCards });
  }

  deal = (shuffle = true) => {
    const p = this.props;

    let counter = 0;
    let cards = Array(p.rows * p.columns).fill(0).map((i) => (
          counter++ % p.limit
      )
    )

    if (shuffle) {
      cards = this._shuffle(cards);
    }

    console.log(cards);

    return cards;
  }

  redeal = () => {
    // TODO UI to tell user what's up
    let cards = this.deal();
    this.setState({ chosenCards:[], matches: [], cards: cards, started: true });
  }

  render() {

    this._checkGameState();

    const cards = this.state.cards.map((n, i) => (
      <Card key={i} value={n} index={i} onClick={(card) => this.handleCardClick(card)} />
    ));

  	return (
  		<div className={`board row-${this.props.columns}`}>
        {cards}
      </div>
  	)
  }

};

/**
 * // @props limit: max card value, if M = columns and N = rows * columns, M < limit < N
 */
Board.defaultProps = {
  rows: 6,
  columns: 4,
  limit: 12,
  matchLimit: 2
};

export default Board;
