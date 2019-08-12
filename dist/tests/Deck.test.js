"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = require("../src/Deck");
describe('DeckOfCards', () => {
    it('instantiates a deck of card with 40 or 52 cards', () => {
        const Deck40 = new Deck_1.DeckOfCards(40);
        const Deck52 = new Deck_1.DeckOfCards(52);
        expect(Deck40.deck.length).toEqual(40);
        expect(Deck52.deck.length).toEqual(52);
    });
    it('has a shuffle function', () => {
        const Deck = new Deck_1.DeckOfCards(40);
        const deckBeforeShuffle = Deck.deck.slice();
        Deck.shuffleDeck();
        expect(Deck.deck).not.toEqual(deckBeforeShuffle);
    });
    it('allows to draw cards from the deck', () => {
        const Deck = new Deck_1.DeckOfCards(40);
        const card = Deck.drawCard();
        expect(card.value).toBeTruthy();
    });
    it('stand alone - has default arguments', () => {
        const Deck = new Deck_1.DeckOfCards();
        const card = Deck.drawCard();
        console.log(card.value);
        expect(card.value).toBeTruthy();
    });
});
