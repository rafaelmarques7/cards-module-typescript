export declare type Suite = "hearts" | "spades" | "diamonds" | "clubs";
export declare type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
export declare class Card {
    rank: Rank;
    suite: Suite;
    value: string;
    constructor(rank: Rank, suite: Suite);
}
