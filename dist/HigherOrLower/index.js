"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deck_1 = require("../Deck");
class HigherOrLower {
    constructor() {
        this.buildDeckOfCards = () => {
            this.Deck = new Deck_1.DeckOfCards();
        };
    }
}
exports.HigherOrLower = HigherOrLower;
exports.default = HigherOrLower;
