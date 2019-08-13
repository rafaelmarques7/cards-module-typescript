import { HigherOrLower, HandHol } from '../Games/HighOrLow';
import { Card, valueCards } from '../Card';

describe('Game Higher or Lower: ', () => {

  it('has a dealCards() method', () => {
    const GameHol = new HigherOrLower();
    expect(typeof(GameHol['deal'])).toBe('function');
  });

  // it('', () => {

  // }

  // it('constructor accepts any given number of players', () => {
  //   const game = new HigherOrLower(3);
  //   expect(game.players.length).toEqual(3);
  // });

  // it('constructor accepts payoff ratios to be set', () => {
  //   expect(true).toEqual(false)
  // });  

});

// this class supports and is to be used w/ the HighLow class
describe('HandHol class', () => {
  it('constructor takes array of Cards and sets them in cards attribute', () => {
    let hand;
    const card = new Card('3', 'clubs');
    // hand of 2 cards
    hand = new HandHol([card, card]);
    expect(hand.cards.length).toEqual(2);
    // hand of 5 cards
    hand = new HandHol([card, card, card, card, card]);
    expect(hand.cards.length).toEqual(5);
    // sets attribute numberOfCards correctly
    expect(hand.numberOfCards).toEqual(5);
  });

  it('has attributes: numberOfCards, cards, valueCards, valueHand', () => {
    const hand = new HandHol();
    expect(typeof(hand.numberOfCards)).toBe('number');
    expect(typeof(hand.cards)).toBe('object');
    expect(typeof(hand.valueCardsArray)).toBe('object');
    expect(typeof(hand.valueHand)).toBe('number')
  }); 

  it('has methods: toString', () => {
    const hand = new HandHol();
    expect(typeof(hand['toString'])).toBe('function');    
    expect(typeof(hand.toString())).toBe('string');
  });

  it('sets attribute valueCards to the sum of the value of each card', () => {
    const card = new Card('3', 'clubs');
    // calculates correctly on hand of two cards
    let hand = new HandHol([card, card]);
    let valueCardsExpected = valueCards['3'] + valueCards['3'];
    expect(hand.valueHand).toEqual(valueCardsExpected);
    // calculates correctly on hand of three cards
    hand = new HandHol([card, card, card]);
     valueCardsExpected = valueCards['3'] + valueCards['3'] + valueCards['3'];
    expect(hand.valueHand).toEqual(valueCardsExpected);
  });
});
