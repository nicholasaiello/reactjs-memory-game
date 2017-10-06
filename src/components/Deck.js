import React from 'react';

class Deck {

  constructor(size = 24, matchSetSize = 2) {
    this._size = size;
    this._matchSetSize = matchSetSize;
    this._cards = Array(size);
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
        (i % matches) + 1  // no zeros
      )
    )

    if (shuffle) {
      this._cards = this.shuffle();
    }
  }

  shuffle(shuffles = 7) {
    let shuffled = this._cards.slice(),
      size = shuffled.length;

    for (let i = 0; i < shuffles; i++) {
      shuffled.map((value, j) => {
        let rand = Math.floor(Math.random() * size);

        shuffled[j] = shuffled[rand];
        shuffled[rand] = value;
      });
    }

    return shuffled;
  }

}

export default Deck;
