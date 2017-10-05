import React from 'react';

class Deck {

  constructor(size = 24, matchSetSize = 2) {
    this._size = size;
    this._matchSetSize = matchSetSize;
    this._cards = Array(size);

    console.debug(this._cards);
  }

  get cards() {
    return this._cards;  
  }

  get size() {
    return this._size;  
  }

  deal(shuffle = true) {
    let matches = this._size / this._matchSetSize;
    this._cards = this._cards.fill(0).map((n, i) => (
        i % matches
      )
    )

    if (shuffle) {
      this._cards = this.shuffle();
    }

    console.debug(this._cards);
  }

  shuffle(shuffles = 5) {
    let shuffled = this._cards.slice(),
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

}

export default Deck;
