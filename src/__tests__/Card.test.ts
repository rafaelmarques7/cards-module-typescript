import { Card } from "../Card";

describe('Card', () => {
  
  it('instantiates an object with correct input', () => {
    const validCard = new Card("A", "clubs");
    expect(validCard).toBeTruthy();
  });

  it('has a property called value with type number', () => {
    const validCard = new Card("A", "clubs");
    expect(validCard.value).toBe(14);
  });

  it('has a property called unicode with type string', () => {
    const validCard = new Card("A", "clubs");
    expect(typeof(validCard.unicode)).toBe("string");
  });  

  it('isSameCard class function returns true only if card has the same value and suite', () => {
    const cardOne = new Card("A", "clubs");
    const cardTwo = new Card("A", "spades");
    const cardThree = new Card("A", "clubs");
    const cardFour = new Card("K", "clubs");

    expect(cardOne.isSameCard(cardTwo)).toEqual(false)
    expect(cardOne.isSameCard(cardThree)).toEqual(true)
    expect(cardOne.isSameCard(cardFour)).toEqual(false)
  });  

});
