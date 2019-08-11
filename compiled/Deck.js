"use strict";
exports.__esModule = true;
var Card_1 = require("./Card");
var misc_1 = require("./misc");
var validSuites = ["hearts", "spades", "diamonds", "clubs"];
var validRanks40 = ["2", "3", "4", "5", "6", "7", "J", "Q", "K", "A"];
var validRanks52 = ["2", "3", "4", "5", "6", "7", , "8", "9", "10", "J", "Q", "K", "A"];
var DeckOfCards = /** @class */ (function () {
    function DeckOfCards(numberOfCards) {
        this.numberOfCards = numberOfCards;
        this.deck = [];
        this.numberOfCards = numberOfCards;
        this.buildDeck();
    }
    DeckOfCards.prototype.buildDeck = function () {
        var _this = this;
        var validRanks = this.numberOfCards == 40 ? validRanks40 : validRanks52;
        validSuites.forEach(function (suite) {
            validRanks.forEach(function (rank) {
                _this.deck.push(new Card_1.Card(rank, suite));
            });
        });
    };
    DeckOfCards.prototype.drawCard = function () {
        if (this.deck.length == 0) {
            console.log("The Deck of Cards is empty. Can not draw card.");
            return 0;
        }
        return this.deck.pop();
    };
    DeckOfCards.prototype.shuffleDeck = function (times) {
        if (times === void 0) { times = 1; }
        for (var i = 1; i <= times; i += 1) {
            console.log('Shuffling deck of cards');
            misc_1.shuffleArray(this.deck);
        }
    };
    return DeckOfCards;
}());
exports.DeckOfCards = DeckOfCards;
