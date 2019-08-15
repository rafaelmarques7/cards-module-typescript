import { Player } from "../Player";
import Bet from "./bet";
import { HandHol } from "./hand";

export class PlayerHighLow extends Player {
  public cards: HandHol = new HandHol();
  public bet: Bet = new Bet();

  constructor(name?: string) {
    super(name)
  }
}
