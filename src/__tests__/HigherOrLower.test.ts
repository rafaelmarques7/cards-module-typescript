import { HigherOrLower, PlayerHighLow, HandHol, Bet } from '../Games/HighLow';
import { Card, valueCards } from '../Card';

describe('Game Higher or Lower: ', () => {

  it('has class attributes: dealer, players, payoffRates, numCardsPerHand', () => {
    const game = new HigherOrLower();
    expect(game.payoffRates).toBeTruthy();
    expect(game.players).toBeTruthy();
    expect(game.numCardsPerHand).toBeTruthy();
    expect(game.dealer).toBeTruthy();
  });

  describe('class constructor', () => {
    it('accepts input(players: PlayerHighLows[], numCardsPerHand: number, payoffRates)', () => {
      const players = [new PlayerHighLow(), new PlayerHighLow(), new PlayerHighLow()];
      const payoffRates = {'high': 2, 'low': 0, 'draw': 5}
      const numCardsPerHand = 3
      const game = new HigherOrLower(players, numCardsPerHand, payoffRates);
      expect(game.players.length).toEqual(3);
      expect(game.numCardsPerHand).toEqual(numCardsPerHand);
      expect(game.payoffRates).toEqual(payoffRates);
    });
  });

  describe('class method deal()', () => {
    it('each player and dealer receive hands with correct number of cards', () => {
      const numCardsPerHand = 3;
      const players = [new PlayerHighLow(), new PlayerHighLow()];
      const game = new HigherOrLower(players, numCardsPerHand);
      game.deal()
      expect(game.dealer.cards.cards.length).toEqual(numCardsPerHand);    
      expect(game.players[0].cards.cards.length).toEqual(numCardsPerHand);
      expect(game.players[1].cards.cards.length).toEqual(numCardsPerHand);
    });

    it('the player gets different cards', () => {
      const numCardsPerHand = 2;
      const players = [new PlayerHighLow()];
      const game = new HigherOrLower(players, numCardsPerHand);
      game.deal()
      const [card_1, card_2] = [game.players[0].cards.cards[0], game.players[0].cards.cards[1]]
      expect(card_1).not.toEqual(card_2);
    });
  });

  describe('class method setBets()', () => {
    it('each players gets to set a bet of x ammount on high | low | tie', () => {
      const players = [new PlayerHighLow(), new PlayerHighLow()];
      const game = new HigherOrLower(players);
      const bets = [new Bet('high', 4), new Bet('low', 3)];
      const [betOne, betTwo] = bets;
      game.deal();
      game.setBets(bets);
      expect(game.players[0].bet).toEqual(betOne);
      expect(game.players[1].bet).toEqual(betTwo);
    });

    it('rejects a bet if a player does not have enough credit', () => {
      const players = [new PlayerHighLow()];
      const game = new HigherOrLower(players);
      const bet = new Bet('high', 4);
      game.players[0].credit = 0;
      game.deal();
      game.setBets([bet]);
      expect(game.players[0].bet.ammount).toEqual(0);
    });

    it('takes the bet ammount from the players credit', () => {
      const players = [new PlayerHighLow()];
      const game = new HigherOrLower(players);
      const bet = new Bet('high', 4)
      game.players[0].credit = 5;
      game.deal();
      expect(game.players[0].credit).toEqual(5);
      game.setBets([bet]);
      expect(game.players[0].credit).toEqual(1);
    })
  });

  describe('class method isWinner()', () => {
    it('returns true or false based on: player', () => {
      const players = [new PlayerHighLow(), new PlayerHighLow()];
      const game = new HigherOrLower(players, 2);
      const handDealer = new HandHol([new Card('2', 'clubs'), new Card('3', 'clubs')]);
      // player one will win
      const handWin = new HandHol([new Card('4', 'clubs'), new Card('5', 'clubs')]);
      const betWin = new Bet('high', 1);
      // player two will loose
      const handLoose = new HandHol([new Card('2', 'diamonds'), new Card('3', 'diamonds')]);
      const betLoose = new Bet('low', 1);
      // state manipulation
      game.dealer.cards = handDealer;
      game.players[0].cards = handWin;
      game.players[1].cards = handLoose;
      game.setBets([betWin, betLoose]);
      // test method 
      expect(game.isWinner(game.players[0])).toEqual(true);      // player one should win
      expect(game.isWinner(game.players[1])).toEqual(false);     // player two should loose
    });
  });

  describe('class method: payoff()', () => {
    it('determines the winner and pays debts to winners', () => {
      const players = [new PlayerHighLow(), new PlayerHighLow()];
      const game = new HigherOrLower(players, 2);
      const handDealer = new HandHol([new Card('2', 'clubs'), new Card('3', 'clubs')]);
      // player one will win
      const handWin = new HandHol([new Card('4', 'clubs'), new Card('5', 'clubs')]);
      const betWin = new Bet('high', 1);
      const expectedPayoff = 1;
      // player two will loose
      const handLoose = new HandHol([new Card('2', 'diamonds'), new Card('3', 'diamonds')]);
      const betLoose = new Bet('low', 1);
      // state manipulation
      game.dealer.cards = handDealer;
      game.players[0].cards = handWin;
      game.players[1].cards = handLoose;
      game.setBets([betWin, betLoose]);
      // players credit before
      const creditWinnerBefore = game.players[0].credit;
      const creditLooserBefore = game.players[1].credit;
      // test method 
      game.payoff();
      expect(game.players[0].credit).toEqual(creditWinnerBefore + betWin.ammount + expectedPayoff);
      expect(game.players[1].credit).toEqual(creditLooserBefore);
    });
  });

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
