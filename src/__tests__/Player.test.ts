import { Player } from '../Games/Player';

describe('Player class', () => {
  it('has accessible class properties: username, credit', () => {
    const player = new Player();
    expect(typeof(player.username)).toBe('string');
    expect(typeof(player.credit)).toBe('number');
  });

  it('has a setCredit() class method thats overwrites the previous credit', () => {
    const player = new Player();
    // method exists
    expect(typeof(player['setCredit'])).toBe('function');
    // method does what is expect
    const bc = player.credit;
    expect(player.credit).not.toEqual(999);
    player.setCredit(999);
    expect(player.credit).toEqual(999);    
  });
});
