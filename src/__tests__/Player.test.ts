import { Player } from '../Games/Player';

describe('Player class', () => {
  it('has accessible class properties: username, credit', () => {
    const player = new Player();
    expect(typeof(player.username)).toBe('string');
    expect(typeof(player.credit)).toBe('number');
  });

  it('has a setCredit() class method', () => {
    const player = new Player();
    expect(typeof(player['setCredit'])).toBe('function');
  });
});
