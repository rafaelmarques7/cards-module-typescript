/*
  Class that defines a "Hand" of cards in a Higher/Lower game
  constructor accepts an array of cards
  exports methods: 
  valueHand(), toString(), numberOfCards(), valueCardsArray()
*/

export default class HandHol {
  public cards: Card[] = [];

  constructor(cards?: Card[]) {
    this.cards = cards ? cards : []; 
  }

  get numberOfCards() {
    return this.cards ? this.cards.length : 0;
  }

  get valueCardsArray() {
    return this.cards.map((card) => card.value);
  }

  get valueHand() {
    const valueCards = this.valueCardsArray.reduce(function(accumulator, currentValue) {
      return accumulator + currentValue
    }, 0);  // default vale of reduce is 0
    return valueCards;
  }

  toString() {
    const cardsUnicodeArray = this.cards ? this.cards.map((card) => card.unicode) : [];
    const handStr = cardsUnicodeArray.reduce(function(accumulator, unicode) {
      return `${accumulator} ${unicode}`;
    }, ''); // '' default value of reduce is ''
    return handStr;
  }
}