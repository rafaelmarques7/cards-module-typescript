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
  public numCardsPerHand: number = 2;

  constructor(players?: PlayerHighLow[], 
    numCardsPerHand?: number, payoffRates?: Payoffs, shuffleDeck = true) {
      players ? this.players = players : null;
      payoffRates ? this.payoffRates = payoffRates : null;
      numCardsPerHand ? this.numCardsPerHand = numCardsPerHand : null;
      shuffleDeck ? this.deck.shuffleDeck() : null;
  }  

  /**
   * Function that returns `numCards` cards. 
   * Side effect - removes cards from deck
   */
  drawCards(numCards: number) {
    return new Array(numCards).fill(this.deck.drawCard());
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
    const players = this.players.concat([this.dealer]);
    players.forEach((_, index) => {
      const hand = new HandHol(this.drawCards(this.numCardsPerHand));
      if (index == this.players.length) {
        this.dealer.cards = hand;
      } else {
        this.players[index].cards = hand;
      }
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
      this.players[index].credit < bet.ammount ? bet.ammount=0: null; // validate player credit
      bet.ammount < 0 ? bet.ammount=0 : null; // validate bet ammound 
      // set bet
      this.players[index].bet = bet;
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
