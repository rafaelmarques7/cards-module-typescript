const { DeckOfCards } = require('../src/Deck');

describe('DeckOfCards', () => {

  it('instantiates a deck of card with 40 or 52 cards', () => {
    const Deck40 = new DeckOfCards(40);
    const Deck52 = new DeckOfCards(52);
    expect(Deck40.deck.length).toEqual(40);
    expect(Deck52.deck.length).toEqual(52);
  });

  it('has a shuffle function', () => {
    const Deck = new DeckOfCards(40);
    const deckBeforeShuffle = Deck.deck.slice();
    Deck.shuffleDeck();
    expect(Deck.deck).not.toEqual(deckBeforeShuffle);
  })

  it('allows to draw cards from the deck', () => {
    const Deck = new DeckOfCards(40);
    const card = Deck.drawCard();
    expect(card.value).toBeTruthy();
  });

});