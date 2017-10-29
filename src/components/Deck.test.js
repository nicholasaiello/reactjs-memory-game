import assert from 'assert';

import React from 'react';
import Deck from './Deck';

describe('Deck of Cards', () => {
  
  it('init deck with N cards', () => {
    const n = 12;
    const d = Deck.create(n);

    assert( d.size === n );
  });

  it('deal deck of shuffled', () => {
    const n = 12;
    const d = Deck.create(n);

    d.deal(true);

    assert( d.size === n );
  });

  it('deck shouldn\'t be equal after shuffling', () => {
    const d = Deck.create(12),
      shouldShuffle = true;

    // deal() creates a new array
    d.deal(shouldShuffle);
    const first = d.cards;

    d.deal(shouldShuffle);
    const second = d.cards;

    assert( !(first.toString() === second.toString()) );
  });

  it('matchSetSize should correctly set card values, size / matchSetSize', () => {
    const size = 12,
      matchSetSize = 2;

    const d = Deck.create(size, matchSetSize),
      shouldShuffle = false;

    let arr = [];
    d.deal(shouldShuffle);

    d.cards.map((v) => {
      if (arr.indexOf(v) === -1) {
        arr.push(v);
      }
    });

    assert( arr.length === (size / matchSetSize) );
  });

});
