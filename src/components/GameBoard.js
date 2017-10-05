import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import Deck from './Deck';
import Card from './Card';


class GameBoard extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      dialogOpen: false,
      chosenCards:[], 
      matches: [], 
      deck: null, 
      started: false
    };
  }

  componentDidMount = () => {
    this.initGame();
  }

  componentWillUnmount = () => {
    
  }

  initGame = () => {
    let deck = new Deck(this.props.rows * this.props.columns);
    deck.deal();

    this.setState({ deck: deck, started: true });
  }

  restartGame = () => {
    let deck = this.state.deck;
    deck.redeal();

    this.setState({ chosenCards:[], matches: [], deck: deck, started: true });
  }

  hasWonGame = () => (
    this.state.started && this.state.matches.length === (this.state.deck || []).size
  )

  showDialog = (copy) => {
    this.setState({ dialogOpen: true, dialogCopy: copy });
  }

  _checkGameState = () => {
    console.log('_checkGameState', this.state.chosenCards);
    let state = this.state;

    if (state.chosenCards.length === this.props.matchSetSize) {
      let card1 = state.chosenCards[0],
        card2 = state.chosenCards[1];

      if (card1.getValue() === card2.getValue()) {
        let matches = state.matches;
        matches = matches.concat(state.chosenCards);
        this.setState({matches: matches, chosenCards: []});
        
        setTimeout(() => {
          this.showDialog('You got a match!');
        }, 250);
      } else {
        this.setState({chosenCards: []});
        setTimeout(() => {
          // this.showDialog('Not a match. Try again.');
          card1.toggleOpen();
          card2.toggleOpen();
        }, 500);
      }
    }

    if (this.hasWonGame()) { // GAME OVER
      this.setState({ started: false });
      if (window.confirm("You won! Would you like to play again?")) {
        this.redeal();
      }
    }
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

  handleDialogClose = () => {
    this.setState({dialogOpen: false});
  }

  render() {

    this._checkGameState();

    const actions = [
      <FlatButton
        label={"Keep Playing"}
        primary={true}
        keyboardFocused={true}
        onClick={this.handleDialogClose}
      />
    ];

    const cards = this.state.deck != null 
      ? this.state.deck.cards.map((n, i) => (
        <Card key={i} value={n} index={i} onClick={(card) => this.handleCardClick(card)} />
      )) : '';

    return (
      <div className={`board col-${this.props.columns}`}>
        {cards}
        <Dialog
          title={"ReactJS Memory Game"}
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}>
          {this.state.dialogCopy}
        </Dialog>
      </div>
    )
  }

};

/**
 * // @props limit: max card value, if M = columns and N = rows * columns, M < limit < N
 */
GameBoard.defaultProps = {
  rows: 4,
  columns: 6,
  limit: 12,
  matchSetSize: 2
};

export default GameBoard;
