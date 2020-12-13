import { Card, Suite, Rank } from './Card'
import { shuffleArray } from './misc';

// constants to build the deck
const validSuites: Suite[] = ["hearts", "spades", "diamonds", "clubs"];
const validRanks40: Rank[] = ["2", "3", "4", "5", "6", "7", "J", "Q", "K", "A"];
const validRanks52: Rank[] = ["2", "3", "4", "5", "6", "7", , "8", "9", "10", "J", "Q", "K", "A"];

// types to build deck
export type validNumberOfCards = 40 | 52;

export class DeckOfCards {
  public deck: Card[] = [];
  public cardsDrawn: Card[] = [];
  public numberOfCards: validNumberOfCards;

  constructor(numberOfCards?: validNumberOfCards) {
    this.numberOfCards = numberOfCards === 40 ? numberOfCards : 52;
    this.buildDeck();
  }

  buildDeck() {
    this.deck = []; // reset deck
    this.cardsDrawn = []; // reset cards drawn

    const validRanks = this.numberOfCards == 40 ? validRanks40 : validRanks52;
    validSuites.forEach(suite => {    // build deck cycle
      validRanks.forEach(rank => {
        this.deck.push(new Card(rank, suite));
      })
    });
  }

  drawCard() {
    if (!this.isEmpty()) {
      const cardFromTop = this.deck.pop()
      this.cardsDrawn.push(cardFromTop)
      return cardFromTop
    }
    return null
  }

  shuffleDeck(times = 1) {
    for (var i=1; i <= times; i+=1) {
      shuffleArray(this.deck);
    }
  }

  isEmpty() {
    return this.deck.length === 0; 
  }
}
