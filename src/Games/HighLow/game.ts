import { PlayerHighLow } from "./player";
import { DeckOfCards, validNumberOfCards } from "../../Deck";
import { Payoffs, Bet } from "./bet";
import { HandHol } from "./hand";
import { combinations } from 'mathjs'

export class HigherOrLower {
  // attributes for game logic
  public deck: DeckOfCards;
  public dealer: PlayerHighLow = new PlayerHighLow('dealer');
  public players: PlayerHighLow[] = [];
  // default class constants
  public payoffRates: Payoffs = { 'high': 1, 'low': 1, 'draw': 5 };
  public _numCardsPerHand: number = 2;

  constructor(
    players?: PlayerHighLow[],
    numCardsPerHand?: number,
    payoffRates?: Payoffs,
    shuffleDeck = true,
    numCardsInDeck: validNumberOfCards = 52,
  ) {
    this.deck = new DeckOfCards(numCardsInDeck)
    players ? this.players = players : null;
    payoffRates ? this.payoffRates = payoffRates : null;
    numCardsPerHand ? this.numCardsPerHand = numCardsPerHand : null;
    shuffleDeck ? this.deck.shuffleDeck() : null;
  }

  get numCardsPerHand() {
    return this._numCardsPerHand;
  }

  /**
   * sets the number of cards per hand. valid values - [1, 2, 3]
   */
  set numCardsPerHand(value) {
    if (value >= 1 || value <= 3) {
      this._numCardsPerHand = value;
    }
  }

  /**
   * Function that returns `numCards` cards. 
   * Side effect - removes cards from deck
   */
  drawCards(numCards: number) {
    let cards = [];
    for (var i = 0; i < numCards; i += 1) {
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
  deal(shuffleDeck = false) {
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
  setBets(bets: Bet[], decreaseCredit = true) {
    bets.forEach((bet, index) => {
      // validate player credit and bet ammount 
      this.players[index].credit < bet.ammount ? bet.ammount = 0 : null;
      bet.ammount < 0 ? bet.ammount = 0 : null;
      // set bet
      this.players[index].bet = bet
      // MONEY: remove from credit
      if (decreaseCredit) {
        this.players[index].credit -= bet.ammount;
      }
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
  payoff(accountForDiscount = true) {
    const discountRate = accountForDiscount ? 1 : 0;
    this.players.forEach((_, index) => {
      const isWinner = this.isWinner(this.players[index]);
      const payoffRate = this.payoffRates[this.players[index].bet.on];
      const payoff = isWinner
        ? (discountRate + payoffRate) * this.players[index].bet.ammount  // money may have been discounted upon bet, so add discount rate
        : 0;
      // MONEY: add to credit
      this.players[index].credit += payoff;
    });
  }

  calculateOdds() {
    const valueHandDealer = this.dealer.cards.valueHand
    const cardsRemaining = this.deck.deck
    const cardsPerHand = this._numCardsPerHand

    // given the remaining cards,
    // how many hands can be drawn next? (denominator) (`handsAvailable`)
    // how many hands can be higher/lower/draw? (numerator) (`numHandsHigh` etc)

    const numHandsAvailable = combinations(cardsRemaining.length, cardsPerHand)

    let [numHandsHigh, numHandsLow, numHandsDraw] = [0, 0, 0]

    let arrayValueHandsAvailable = []

    this.deck.deck.forEach((cardOne, indexCardOne) => {
      if (cardsPerHand === 1) {
        const cards = [cardOne]
        const hand = new HandHol(cards)
        arrayValueHandsAvailable.push(hand.valueHand)
      }

      if (cardsPerHand === 2) {
        this.deck.deck.forEach((cardTwo, indexCardTwo) => {
          if (indexCardTwo < indexCardOne) {
            return
          }
          if (cardOne.isSameCard(cardTwo)) {
            // console.log(`matching cards: (${cardOne.unicode}, ${cardTwo.unicode}), skipping`)
            return
          }
          const cards = [cardOne, cardTwo]
          const hand = new HandHol(cards)
          arrayValueHandsAvailable.push(hand.valueHand)
        })
      }

      if (cardsPerHand === 3) {
        this.deck.deck.forEach((cardTwo, indexCardTwo) => {
          if (indexCardTwo < indexCardOne) {
            return
          }
          this.deck.deck.forEach((cardThree, indexCardThree) => {
            if (indexCardThree < indexCardTwo) {
              return
            }
            if (cardOne.isSameCard(cardTwo) || cardOne.isSameCard(cardThree) || cardTwo.isSameCard(cardThree)) {
              // console.log(`matching cards: (${cardOne.unicode}, ${cardTwo.unicode}, ${cardThree.unicode}), skipping`)
              return
            }
            const cards = [cardOne, cardTwo, cardThree]
            const hand = new HandHol(cards)
            arrayValueHandsAvailable.push(hand.valueHand)
          })
        })
      }
    })

    arrayValueHandsAvailable.forEach(valueHand => {
      if (valueHand > valueHandDealer) {
        numHandsHigh += 1
      } else if (valueHand === valueHandDealer) {
        numHandsDraw += 1
      } else {
        numHandsLow += 1
      }
    })

    return {
      high: numHandsHigh / numHandsAvailable,
      low: numHandsLow / numHandsAvailable,
      draw: numHandsDraw / numHandsAvailable,
    }
  }
};
