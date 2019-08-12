import { HigherOrLower } from '../HigherOrLower';

describe('Game Higher or Lower: ', () => {

  it('has an initGame() method', () => {
    const GameHol = new HigherOrLower();
    expect(typeof(GameHol['initGame']) === 'function').toBeTruthy();
  });
  
});
