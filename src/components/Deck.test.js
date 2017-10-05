import React from 'react';
import Deck from './Deck';

it('init deck with N cards', () => {
  let n = 12;	
  let d = new Deck(n);

  // d.size === n;
  d.deal();
  // d.size === n;
});
