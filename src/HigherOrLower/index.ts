import { DeckOfCards } from "../Deck";

export class HigherOrLower {
  private Deck: DeckOfCards;

  initGame = () => {
    this.Deck = new DeckOfCards();          
  }
}

export default HigherOrLower;