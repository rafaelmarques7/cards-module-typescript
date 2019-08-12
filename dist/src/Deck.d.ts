import { Card } from './Card';
declare type validNumberOfCards = 40 | 52;
export declare class DeckOfCards {
    numberOfCards: validNumberOfCards;
    deck: Card[];
    constructor(numberOfCards: validNumberOfCards);
    buildDeck(): void;
    drawCard(): Card | 0;
    shuffleDeck(times?: number): void;
}
export {};
