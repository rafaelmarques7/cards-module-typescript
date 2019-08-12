"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('Card', () => {
    it('instantiates an object with correct input', () => {
        const validCard = new src_1.Card("A", "clubs");
        expect(validCard).toBeTruthy;
    });
    it('has a property called value', () => {
        const validCard = new src_1.Card("A", "clubs");
        expect(typeof (validCard.value)).toBe('string');
    });
});
