import { DeckOfCards } from "../Deck";
import { Card } from "../Card";

export class Player {
  public stack: number = 5;
}

type BetType = "high" | "low" | "draw";

interface Bet {
  on: BetType;
  credit: number
}

type Hand = [Card, Card];

export class HandHol {
  
}

export class HigherOrLower {
  private deck: DeckOfCards = new DeckOfCards();
  public player: Player = new Player();
  public cardsDealer: Hand;
  public cardsPlayer: Hand;
  public betPlayer: Bet;

  constructor(shuffleDeck=true) {
    if (shuffleDeck) { this.deck.shuffleDeck() }  
  }
  
  get valueHandDealer() {
    return this.cardsDealer[0].value + this.cardsDealer[1].value;
  }

  get valueHandPlayer() {
    return  this.cardsPlayer[0].value + this.cardsPlayer[1].value;
  }

  get resultRound() {
      // Dealer Wins => return 1 
      if (this.valueHandDealer > this.valueHandPlayer) { return 1 }
      if (this.valueHandDealer < this.valueHandPlayer) { return -1 }
      if (this.valueHandDealer == this.valueHandPlayer) { return 0 }
  }

  deal() {
    if (this.deck.deck.length < 4) {
      this.deck = new DeckOfCards();
    }
    this.cardsDealer = [this.deck.drawCard(), this.deck.drawCard()];
    this.cardsPlayer = [this.deck.drawCard(), this.deck.drawCard()];    
  }

  simulateRound() {
    this.deal();
    const validBetsOn =  ["high", "low", "draw"];
    const onRandom = validBetsOn[Math.floor(Math.random() * validBetsOn.length)];
    const creditRandom = Math.floor(Math.random()*this.player.stack) + 1;
    const randomBet = {on: onRandom, credit: creditRandom } as Bet;
    // Places the player bet. Takes credit from him.
    this.placeBet(randomBet);
    // payoff, including initial bet in case of win; 0 in case of player loose
    const payoff = this.calculatePayoff();
    this.player.stack += payoff;
    
    console.log(`
      Dealer draws, facing down, two cards for himself and other for the player.
      Upon seeing his hand (${this.handToString(true)}), \
        the players (credit: ${this.player.stack}) places a bet: 
      ${randomBet.credit}\$ on ${randomBet.on}!
      The dealer shows his hand (${this.handToString(false)})
      The player ${payoff ? "wins": "looses"}!
      Current credit: ${this.player.stack}\$.
    `);
  }

  handToString(player=true) {
    if (player) {
      return `${this.cardsPlayer[0].unicode} ${this.cardsPlayer[1].unicode} => ${this.valueHandPlayer} points`
    } else {
      return `${this.cardsDealer[0].unicode} ${this.cardsDealer[1].unicode} => ${this.valueHandDealer} points `
    }
  }

  placeBet(bet: Bet) {
    // Validate credit and bet
    if (bet.credit < 1) { bet.credit = 0 }
    if (this.player.stack <= 0) { bet.credit = 0 }
    if (this.player.stack < bet.credit) { bet.credit = this.player.stack }
    // take credit from player
    this.player.stack -= bet.credit;
    // set Bet
    this.betPlayer = bet;
  }
  
  calculatePayoff() {
    // handle draw with player betting on draw
    if (this.betPlayer.on == "draw" 
        && this.valueHandDealer == this.valueHandPlayer) {
      return (5 + 1) * this.betPlayer.credit;
    }
    // handle player high card with player betting on high
    if (this.betPlayer.on == "high" 
        && this.valueHandPlayer > this.valueHandDealer) {
      return (1 + 1) * this.betPlayer.credit;
    }
    // handle low with player winner
    if (this.betPlayer.on == "low"
        && this.valueHandPlayer < this.valueHandDealer) {
      return (1 + 1) * this.betPlayer.credit;
    } 
    // Player looses round
    return 0;
  }
}

export default HigherOrLower;