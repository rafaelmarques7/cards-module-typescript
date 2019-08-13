import { Card } from "../Card";

describe('Card', () => {
  
  it('instantiates an object with correct input', () => {
    const validCard = new Card("A", "clubs");
    expect(validCard).toBeTruthy;
  });

  it('has a property called value with type number', () => {
    const validCard = new Card("A", "clubs");
    expect(validCard.value).toBe(14);
  });

  it('has a property called unicode with type string', () => {
    const validCard = new Card("A", "clubs");
    expect(typeof(validCard.unicode)).toBe("string");
  });  

});