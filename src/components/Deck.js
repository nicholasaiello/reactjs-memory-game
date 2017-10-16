/**
 * Deck of cards prototype
 */
const Deck = {

  create: function(size = 24, matchSetSize = 2) {
    let _size = size,
      _dealt = false,
      _matchSetSize = matchSetSize,
      _cards = Array(size);

    const _deal = (shuffle = true) => {
      let matches = _size / _matchSetSize;
      _cards = _cards.fill(0).map((n, i) => (
          (i % matches) + 1  // no zeros
        )
      )

      if (shuffle) {
        _cards = _shuffle();
      }

      _dealt = true;
    }

    const _shuffle = (shuffles = 7) => {
      let shuffled = _cards.slice(),
        size = shuffled.length;

      for (let i = 0; i < shuffles; i++) {
        shuffled.forEach((value, j) => {
          let rand = Math.floor(Math.random() * size);

          shuffled[j] = shuffled[rand];
          shuffled[rand] = value;
        });
      }

      return shuffled;
    }

    // public interface
    return {
      get dealt() { return _dealt; },
      get size() { return _size; },
      get cards() { return _cards; },
      deal: _deal,
      shuffle: _shuffle
    };
  }

};

export default Deck;
