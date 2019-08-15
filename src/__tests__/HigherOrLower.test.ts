import { HigherOrLower, HandHol } from '../Games/HighOrLow';
import { Card, valueCards } from '../Card';
import { PlayerHol } from '../Games/HighOrLow';
import Bet from '../Games/HighLow/bet';

describe('Game Higher or Lower: ', () => {

  it('has class attributes: dealer, players, payoffRates, numCardsPerHand', () => {
    const game = new HigherOrLower();
    expect(game.payoffRate).toBeTruthy();
    expect(game.players).toBeTruthy();
    expect(game.numCardsPerHand).toBeTruthy();
    expect(game.dealer).toBeTruthy();
  });

  describe('class constructor', () => {
    it('accepts input(players: PlayerHols[], numCardsPerHand: number, payoffRates)', () => {
      const players = [new PlayerHol(), new PlayerHol(), new PlayerHol()];
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
      const players = [new PlayerHol(), new PlayerHol()];
      const numCardsPerHand = 3;
      const game = new HigherOrLower(players, numCardsPerHand);
      game.deal()
      expect(game.dealer.cards.length).toEqual(numCardsPerHand);    
      expect(game.players[0].cards.length).toEqual(numCardsPerHand);
      expect(game.players[1].cards.length).toEqual(numCardsPerHand);
    });
  });

  describe('class method setBets()', () => {
    it('each players gets to set a bet of x ammount on high | low | tie', () => {
      const players = [new PlayerHol(), new PlayerHol()];
      const game = new HigherOrLower(players);
      const bets = [new Bet('high', 4), new Bet('low', 3)];
      const [betOne, betTwo] = bets;
      game.deal();
      game.setBets(bets);
      expect(game.players[0].bet).toEqual(betOne);
      expect(game.player[1].bet).toEqual(betTwo);
    });

    it('rejects a bet if a player does not have enough credit', () => {
      const players = [new PlayerHol()];
      const game = new HigherOrLower(players);
      const bet = new Bet('high', 4)
      game.players[0].credit = 0;
      game.deal();
      game.setBets([bet]);
      expect(game.players[0].bet).not.toEqual(bet);
    });
  });

  describe('class method isPlayerHolWinner()', () => {
    it('returns true or false based on: player', () => {
      const players = [new PlayerHol(), new PlayerHol()];
      const game = new HigherOrLower(players, 2);
      const handDealer = [new HandHol('2', 'clubs'), new HandHol('3', 'clubs')];
      // player one will win
      const handWin = [new HandHol('4', 'clubs'), new HandHol('5', 'clubs')];
      const betWin = new Bet('high', 1);
      // player two will loose
      const handLoose = [new HandHol('2', 'diamonds'), new HandHol('3', 'diamonds')];
      const betLoose = new Bet('low', 1);
      // state manipulation
      game.dealer.cards = handDealer;
      game.player[0].cards = handWin;
      game.player[1].cards = handLoose;
      game.setBets([betWin, betLoose]);
      // test method 
      expect(game.isPlayerHolWinner(game.players[0])).toEqual(true);      // player one should win
      expect(game.isPlayerHolWinner(game.players[1])).toEqual(false);     // player two should loose
    });
  });

  describe('class method calculatePayoff()', () => {
    it('calculates payoff correctly based on: win/loss, ammount, and rate', () => {
      const game = new HigherOrLower();
      // bet win, ammount: 2 rate: 1:1
      expect(game.calculatePayoff(1, 2, 1)).toEqual(2); 
      // bet win, ammount: 2 rate: 5:1
      expect(game.calculatePayoff(1, 2, 5)).toEqual(10);    
      // bet loss, ammount: 2 rate: 1:1
      expect(game.calculatePayoff(0, 2, 1)).toEqual(0);    
    });
  });

  describe('class method: payoff()', () => {
    it('determines the winner and pays debts to winners', () => {
      const players = [new PlayerHol(), new PlayerHol()];
      const game = new HigherOrLower(players, 2);
      const handDealer = [new HandHol('2', 'clubs'), new HandHol('3', 'clubs')];
      // player one will win
      const handWin = [new HandHol('4', 'clubs'), new HandHol('5', 'clubs')];
      const betWin = new Bet('high', 1);
      const expectedPayoff = 1;
      // player two will loose
      const handLoose = [new HandHol('2', 'diamonds'), new HandHol('3', 'diamonds')];
      const betLoose = new Bet('low', 1);
      // state manipulation
      game.dealer.cards = handDealer;
      game.player[0].cards = handWin;
      game.player[1].cards = handLoose;
      game.setBets([betWin, betLoose]);
      // players credit before
      const creditWinnerBefore = game.player[0].credit;
      const creditLooserBefore = game.player[1].credit;
      // test method 
      game.payoff();
      expect(game.player[0].credit).toEqual(creditWinnerBefore + expectedPayoff);
      expect(game.player[1].credit).toEqual(creditLooserBefore);
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
