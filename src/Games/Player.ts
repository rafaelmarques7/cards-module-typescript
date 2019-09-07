export class Player {
  constructor(public username?: string, public credit=2) {
    this.credit = credit;
    this.username = username ? username : 'sun doe';
  }

  setCredit(newCredit: number) {
    this.credit = newCredit;
  }

  setUsername(username: string) {
    this.username = username
  }
}
