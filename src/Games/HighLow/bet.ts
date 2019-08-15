export type BetType = "high" | "low" | "draw";

export interface BetInterface {
  on: BetType;
  credit: number
}

export default class Bet {
  constructor(public on: BetType, public ammount: number) {
    this.on = on;
    this.ammount = ammount > 0 ? ammount : 0;
  }
}