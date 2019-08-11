"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const symbolUnicodes = {
    hearts: "\u2665",
    spades: "\u2660",
    diamonds: "\u2666",
    clubs: "\u2663"
};
class Card {
    constructor(rank, suite) {
        this.rank = rank;
        this.suite = suite;
        this.rank = rank;
        this.suite = suite;
        this.value = `${rank} ${symbolUnicodes[this.suite]}`;
    }
}
exports.Card = Card;
