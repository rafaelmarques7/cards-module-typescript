export class Player {
  public credit: number = 5;               // default credit to 5

  constructor(public username?: string) {
    this.username = username ? username : 'sun doe';
  }

  setCredit(newCredit: number) {
    this.credit = newCredit;
  }
}
