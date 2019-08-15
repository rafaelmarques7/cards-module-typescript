export type BetType = "high" | "low" | "draw" | "pass";

export interface BetInterface {
  on: BetType;
  credit: number
}

export interface Payoffs {
  high: number;
  low: number;
  draw: number; 
}

export class Bet {
  constructor(public on?: BetType, public ammount?: number) {
    this.on = on ? on : 'pass';
    this.ammount = ammount > 0 ? ammount : 0;
  }
}
