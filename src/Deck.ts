import { Card, Suite, Rank } from './Card'
import { shuffleArray } from './misc';

type validNumberOfCards = 40 | 52;

const validSuites: Suite[] = ["hearts", "spades", "diamonds", "clubs"];
const validRanks40: Rank[] = ["2", "3", "4", "5", "6", "7", "J", "Q", "K", "A"];
const validRanks52: Rank[] = ["2", "3", "4", "5", "6", "7", , "8", "9", "10", "J", "Q", "K", "A"];

export class DeckOfCards {
  public deck: Card[] = [];
  
  constructor(public numberOfCards: validNumberOfCards) {
    this.numberOfCards = numberOfCards;
    this.buildDeck();
  }

  buildDeck() {
    const validRanks = this.numberOfCards == 40 ? validRanks40 : validRanks52;
    validSuites.forEach(suite => {
      validRanks.forEach(rank => {
        this.deck.push(new Card(rank, suite));
      })
    });
  }

  drawCard() {
    if (this.deck.length == 0) {
      console.log("The Deck of Cards is empty. Can not draw card.")
      return 0;
    }
    return this.deck.pop();
  }

  shuffleDeck(times = 1) {
    for (var i=1; i <= times; i+=1) {
      shuffleArray(this.deck);
    }
  }
}