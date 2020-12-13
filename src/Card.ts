export type Suite = "hearts" | "spades" | "diamonds" | "clubs"; 
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export const valueCards = {
  2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9, 10:10, J:11, Q: 12, K: 13, A: 14
}

const symbolUnicodes = {
  clubs: "\u2663",
  hearts: "\u2665",
  spades: "\u2660",
  diamonds: "\u2666"
}

export class Card {
  public rank: Rank;
  public suite: Suite;
  public value: number;
  public unicode: string;

  constructor(rank: Rank, suite: Suite) {
    this.rank = rank;
    this.suite = suite;
    this.value = valueCards[rank];
    this.unicode = `${symbolUnicodes[this.suite]}${rank}`;
  }
  
  compare = (otherCard: Card) => {
    if (this.value == otherCard.value) { return 0 }
    if (this.value > otherCard.value) { return 1 }
    if (this.value < otherCard.value) { return -1 }
  }

  isSameCard = (otherCard: Card) => {
    if (this.value === otherCard.value && this.suite === otherCard.suite) {
      return true
    }
    return false
  }
}
