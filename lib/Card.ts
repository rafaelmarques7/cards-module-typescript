export type Suite = "hearts" | "spades" | "diamonds" | "clubs"; 
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export class Card {
  value: string;
  constructor(public rank: Rank, public suite: Suite) {
    this.rank = rank;
    this.suite = suite;
    this.value = `${rank} ${suite}`;
  }
}
