import { PlayerHighLow } from "./player";
import { DeckOfCards } from "../../Deck";
import { Payoffs, Bet } from "./bet";
import { HandHol } from "./hand";

export class HigherOrLower {
  // attributes for game logic
  private deck: DeckOfCards = new DeckOfCards();
  public dealer: PlayerHighLow = new PlayerHighLow('dealer');
  public players: PlayerHighLow[] = [];
  // default class constants
  public payoffRates: Payoffs =  {'high': 1, 'low': 1, 'draw': 5};
  public _numCardsPerHand: number = 2;

  constructor(players?: PlayerHighLow[], 
    numCardsPerHand?: number, payoffRates?: Payoffs, shuffleDeck = true) {
      players ? this.players = players : null;
      payoffRates ? this.payoffRates = payoffRates : null;
      numCardsPerHand ? this.numCardsPerHand = numCardsPerHand : null;
      shuffleDeck ? this.deck.shuffleDeck() : null;
  }  

  get numCardsPerHand() { 
    return this._numCardsPerHand;
  }

  set numCardsPerHand(value) {
    if (value >= 1) {
      this._numCardsPerHand = value;
    }
  }

  /**
   * Function that returns `numCards` cards. 
   * Side effect - removes cards from deck
   */
  drawCards(numCards: number) {
    let cards = [];
    for(var i=0; i<numCards; i+=1) {
      cards.push(this.deck.drawCard());
    }
    return cards;
  }

  /**
   * Method to deal cards to all players and dealer.
   * 
   * Side effect - set value of: 
   *  * `this.players[:].cards`
   *  * `this.dealer.cards` 
   */
  deal(shuffleDeck=false) {
    shuffleDeck ? this.deck.shuffleDeck() : null;
    // set dealers cards
    this.dealer.cards = new HandHol(this.drawCards(this.numCardsPerHand));
    // set all players cards
    this.players.forEach((_, index) => {
      this.players[index].cards = new HandHol(this.drawCards(this.numCardsPerHand));
    });
  }

  /**
   * Method to set bets based on array of Bet objects
   * 
   * Side effect - set value of:
   *  * `this.players[:].bet` - set bet
   *  * `this.players[:].credit - discount bet.ammount
   */
  setBets(bets: Bet[]) {
    bets.forEach((bet, index) => {
      // validate player credit and bet ammount 
      this.players[index].credit < bet.ammount ? bet.ammount=0: null; 
      bet.ammount < 0 ? bet.ammount=0 : null; 
      // set bet
      this.players[index].bet = bet
      // MONEY: remove from credit
      this.players[index].credit -= bet.ammount;
    });
  }

  /**
   * Method do termine if a player is winner,
   * based on the players bet, and the players and dealers hands.
   */
  isWinner(player: PlayerHighLow) {
    return (player.bet.on == 'high' 
      && player.cards.valueHand > this.dealer.cards.valueHand) || 
      (player.bet.on == 'low' 
      && player.cards.valueHand < this.dealer.cards.valueHand) ||
      (player.bet.on == 'draw' 
      && player.cards.valueHand === this.dealer.cards.valueHand);
  }

  /**
   * Method to pay rewards to players that win the bet
   */
  payoff() {
    this.players.forEach((_, index) => {
      const isWinner = this.isWinner(this.players[index]);
      const payoffRate = this.payoffRates[this.players[index].bet.on];
      const payoff = isWinner 
        ? (1 + payoffRate)*this.players[index].bet.ammount  // money was discounted upon bet, so need to (+1) on payoff
        : 0;
      // MONEY: add to credit
      this.players[index].credit += payoff;
    });
  }
};
