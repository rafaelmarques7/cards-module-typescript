import { PlayerHighLow } from "./player";
import { DeckOfCards } from "../../Deck";
import Bet, { Payoffs } from "./bet";
import { HandHol } from "./hand";


export class HigherOrLower {
  private deck: DeckOfCards = new DeckOfCards();
  public dealer: PlayerHighLow = new PlayerHighLow('dealer');
  public players: PlayerHighLow[] = [];
  public payoffRates: Payoffs =  {'high': 1, 'low': 1, 'draw': 5};
  public numCardsPerHand: number = 2;

  constructor(players?: PlayerHighLow[], 
    numCardsPerHand?: number, payoffRates?: Payoffs, shuffleDeck = true) {
      shuffleDeck ? this.deck.shuffleDeck() : null;
      this.players = players;
      this.numCardsPerHand = numCardsPerHand;
      this.payoffRates = payoffRates; 
  }  

  drawCards(numCards: number) {
    return new Array(numCards).fill(this.deck.drawCard());
  }

  deal() {
    const players = [this.players].concat([this.dealer]);
    players.forEach((_, index) => {
      if (index == this.players.length) {
        let hand = new HandHol(this.drawCards(this.numCardsPerHand))
        this.dealer.cards = hand;
      } else {
        let hand = new HandHol(this.drawCards(this.numCardsPerHand))
        this.players[index].cards = hand;
      }
    })
  }

  setBets(bets: Bet[]) {
    bets.forEach((bet, index) => {
      bet < 0 ? bet.ammount=0 : null; // validate bet ammound 
      this.players[index].credit < bet ? bet.ammount=0: null; // validate player credit
      // set bet
      this.players[index].bet = bet;
      // MONEY: remove from credit
      this.players[index].credit -= bet.ammount;
    });
  }

  isWinner(player: PlayerHighLow) {
    return (player.bet.on == 'high' 
      && player.cards.valueHand > this.dealer.cards.valueHand) || 
      (player.bet.on == 'low' 
      && player.cards.valueHand < this.dealer.cards.valueHand) ||
      (player.bet.on == 'draw' 
      && player.cards.valueHand === this.dealer.cards.valueHand);
  }

  payoff() {
    this.players.forEach((_, index) => {
      const isWinner = this.isWinner(this.players[index]);
      const payoffRate = this.payoffRates[this.players[index].bet.on];
      const payoff = isWinner ? (1 + payoffRate)*this.players[index].bet.ammount : 0;
      // MONEY: add to credit
      this.players[index].credit += payoff;
    });
  }

};