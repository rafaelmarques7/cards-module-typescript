import { Card } from "../src";

describe('Card', () => {
  
  it('instantiates an object with correct input', () => {
    const validCard = new Card("A", "clubs");
    expect(validCard).toBeTruthy;
  });

  it('has a property called value', () => {
    const validCard = new Card("A", "clubs");
    expect(typeof(validCard.value)).toBe('string');
  });

});