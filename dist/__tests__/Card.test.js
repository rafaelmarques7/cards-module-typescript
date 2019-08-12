"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("../Card");
describe('Card', () => {
    it('instantiates an object with correct input', () => {
        const validCard = new Card_1.Card("A", "clubs");
        expect(validCard).toBeTruthy;
    });
    it('has a property called value', () => {
        const validCard = new Card_1.Card("A", "clubs");
        expect(typeof (validCard.value)).toBe('string');
    });
});
