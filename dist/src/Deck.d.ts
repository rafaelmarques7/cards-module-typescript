import { Card } from './Card';
declare type validNumberOfCards = 40 | 52;
export declare class DeckOfCards {
    deck: Card[];
    numberOfCards: validNumberOfCards;
    constructor(numberOfCards?: validNumberOfCards);
    buildDeck(): void;
    drawCard(): Card;
    shuffleDeck(times?: number): void;
    isEmpty(): boolean;
}
export {};
