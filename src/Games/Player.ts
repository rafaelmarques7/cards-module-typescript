export class Player {
  public credit: number = 5;               // default credit to 5
  public username: string = 'sun doe';     // default username 'sun doe'

  setCredit(newCredit: number) {
    this.credit = newCredit;
  }
}
