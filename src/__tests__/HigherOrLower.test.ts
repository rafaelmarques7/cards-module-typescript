import { HigherOrLower, Player } from '../HigherOrLower';

describe('Game Higher or Lower: ', () => {

  it('has a deal() method', () => {
    const GameHol = new HigherOrLower();
    // cardsDealer is not yet set 
    expect(typeof(GameHol.cardsDealer)).toBe('undefined');
    // cardsDealer is set here
    GameHol.deal();
    expect(typeof(GameHol.cardsDealer)).toBe('object');
  });

  // it('has a playRound() method', () => {
  //   const GameHol = new HigherOrLower();
  //   GameHol.playRound();
  // });

});

describe('Player class', () => {
  
  it('has a stack attribute with default value', () => {
    const player = new Player();
    expect(player.stack).toEqual(5);
  });
  
  it('allows the stack to be modified', () => {
    const player = new Player();
    player.stack += 1;
    expect(player.stack).toEqual(6);
  });

});

const game = new HigherOrLower();
for (var i=1; i < 5; i+=1) {
  game.simulateRound();
}