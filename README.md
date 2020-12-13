# Deck of Cards library using TypeScript

This is a very simple deck-of-cards library built using TypeScript.
This was built for personal usage, and mostly to play around with TypeScript.
Feel free to clone and to star the repo, if you feel like it.

---

## Table of Contents

- [Deck of Cards library using TypeScript](#deck-of-cards-library-using-typescript)
  - [Table of Contents](#table-of-contents)
  - [Distributions](#distributions)
  - [Installation and usage](#installation-and-usage)
    - [Node.js](#nodejs)
    - [TypeScript](#typescript)
  - [Project Structure](#project-structure)
  - [The Library](#the-library)
    - [Card](#card)
    - [Deck](#deck)
    - [HigherOrLower](#higherorlower)
  - [Tests](#tests)
  - [To Do's](#to-dos)


---

## Distributions

This library is available via npm.

To update the version available in npm, run:
```
npm run prepublishOnly
npm publish
```

---

## Installation and usage

This library is packaged and distributed using *npm*.

To install the library, run:
```bash
npm install card-games-typescript
```


### Node.js

To use the library from a Node.js project:
```javascript
import { Card, DeckOfCards } from 'card-games-typescript';

// You can now use the imported classes
const card = new Card("2", "diamonds");
console.log(card);    // output: Card {rank: "2", suite: "diamonds", value: "2 ♦"}
``` 

### TypeScript

To use the library from a TypeScript project:
```typescript
import { Card } from 'card-games-typescript';
 
const card = new Card("2", "diamonds");
console.log(card); // output: Card {rank: "2", suite: "diamonds", value: "2 ♦"}
```

---

## Project Structure

This is the current structure of this library.

* The library login is contained in `/src`;
* The library compiles to a `/dist` directory;

```
.
├── jest.config.js
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── Card.ts
│   ├── Deck.ts
│   ├── Games
│   │   ├── HighLow
│   │   │   ├── bet.ts
│   │   │   ├── game.ts
│   │   │   ├── hand.ts
│   │   │   ├── index.ts
│   │   │   └── player.ts
│   │   ├── index.ts
│   │   └── Player.ts
│   ├── index.ts
│   ├── main.js
│   ├── misc.ts
│   └── __tests__
│       ├── Card.test.ts
│       ├── Deck.test.ts
│       ├── HigherOrLower.test.ts
│       └── Player.test.ts
└── tsconfig.json

```

---

## The Library

This library includes two main classes: `Card` and `DeckOfCards`.

This library also includes a `HigherOrLower` class that implements the logic of a simple card game. 
There are a number of classes that exist mostly to support this game (`HandHol`, `PlayerHol`, `Bet`).
This is to simplify and extend the functionality of the game.

### Card

The Card class has three **properties**: 
  * `value` 
  * `rank` 
  * `suite` 

**Usage** example:
  ```typeScript
  const card = new Card("A", "hearts") // Instantiate Card class
  console.log(card)                     // Output: A ♥	
  ```

**Source**:
  ```typeScript
  export type Suite = "hearts" | "spades" | "diamonds" | "clubs"; 
  export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

  export class Card {
    value: string;
    constructor(public rank: Rank, public suite: Suite) {
      this.rank = rank;
      this.suite = suite;
      this.value = `${rank} ${symbolUnicodes[this.suite]}`;
    }
  }
  ```

### Deck

The DeckOfCards class has the following properties:
* deck - an array of Cards
* drawCard() - function that returns a card
* shuffleDeck() - function that shuffles the deck, in place

**Usage** example:
```typeScript
// Build the deck with 52 cards
const Deck = new DeckOfCards(40);  

// Shuffle the deck
Deck.shuffleDeck();

// Draw some cards
for (let index = 1; index < 6; index++) {
  let card = Deck.drawCard();
  console.log(`Card ${index} - ${card.value}`);  
}
```

**Source**:
```typeScript
export class DeckOfCards {
  public deck: Card[] = [];
  
  constructor(public numberOfCards: validNumberOfCards) {
    this.numberOfCards = numberOfCards;
    this.buildDeck();
  }

  buildDeck() {
    const validRanks = this.numberOfCards == 40 ? validRanks40 : validRanks52;
    validSuites.forEach(suite => {
      validRanks.forEach(rank => {
        this.deck.push(new Card(rank, suite));
      })
    });
  }

  drawCard() {
    if (this.deck.length == 0) {
      console.log("The Deck of Cards is empty. Can not draw card.")
      return 0;
    }
    return this.deck.pop();
  }

  shuffleDeck(times = 1) {
    for (var i=1; i <= times; i+=1) {
      shuffleArray(this.deck);
    }
  }
}
```


### HigherOrLower

This is the class that implements the logic for a simple card game. 
There are a number of classes that exist mostly to support this game class, for example, `HandHol`, `PlayerHol`, `Bet`.
This is to simplify and extend the functionality of the game.

**Example usage**:

```typescript
describe('class method: payoff()', () => {
  it('determines the winner and pays debts to winners', () => {
    const players = [new PlayerHighLow(), new PlayerHighLow()];
    const game = new HigherOrLower(players, 2);
    const handDealer = new HandHol([new Card('2', 'clubs'), new Card('3', 'clubs')]);
    // player one will win
    const handWin = new HandHol([new Card('4', 'clubs'), new Card('5', 'clubs')]);
    const betWin = new Bet('high', 1);
    const expectedPayoff = 1;
    // player two will loose
    const handLoose = new HandHol([new Card('2', 'diamonds'), new Card('3', 'diamonds')]);
    const betLoose = new Bet('low', 1);
    // state manipulation
    game.dealer.cards = handDealer;
    game.players[0].cards = handWin;
    game.players[1].cards = handLoose;
    game.setBets([betWin, betLoose]);
    // players credit before
    const creditWinnerBefore = game.players[0].credit;
    const creditLooserBefore = game.players[1].credit;
    // test method 
    game.payoff();
    expect(game.players[0].credit).toEqual(creditWinnerBefore + betWin.ammount + expectedPayoff);
    expect(game.players[1].credit).toEqual(creditLooserBefore);
  });
});
```



Simplified **source code**:

```typescript
export class HigherOrLower {
  // attributes for game logic
  private deck: DeckOfCards = new DeckOfCards();
  public dealer: PlayerHighLow = new PlayerHighLow('dealer');
  public players: PlayerHighLow[] = [];
  // default class constants
  public payoffRates: Payoffs =  {'high': 1, 'low': 1, 'draw': 5};
  public numCardsPerHand: number = 2;

  constructor(players?: PlayerHighLow[], numCardsPerHand?: number, payoffRates?: Payoffs, shuffleDeck = true) {
      shuffleDeck ? this.deck.shuffleDeck() : null;
  }  

  drawCards(numCards: number) {
    return new Array(numCards).fill(this.deck.drawCard());
  }

  /**
   * Method to deal cards to all players and dealer.
   * 
   * Side effect - set value of: 
   *  * `this.players[:].cards`
   *  * `this.dealer.cards` 
   */
  deal(shuffleDeck=false) {
    shuffleDeck ? this.deck.shuffleDeck() : null;
    // set dealers cards
    this.dealer.cards = new HandHol(this.drawCards(this.numCardsPerHand));
    // set all players cards
    this.players.forEach((_, index) => {
      this.players[index].cards = new HandHol(this.drawCards(this.numCardsPerHand));
    });
  }

  /**
   * Method to set bets based on array of Bet objects
   * 
   * Side effect - set value of:
   *  * `this.players[:].bet` - set bet
   *  * `this.players[:].credit - discount bet.ammount
   */
  setBets(bets: Bet[]) {
  }

  /**
   * Method do termine if a player is winner,
   * based on the players bet, and the players and dealers hands.
   */
  isWinner(player: PlayerHighLow) {
    return (player.bet.on == 'high' 
      && player.cards.valueHand > this.dealer.cards.valueHand) || 
      (player.bet.on == 'low' 
      && player.cards.valueHand < this.dealer.cards.valueHand) ||
      (player.bet.on == 'draw' 
      && player.cards.valueHand === this.dealer.cards.valueHand);
  }

  /**
   * Method to pay rewards to players that win the bet
   */
  payoff() {
  });
  }
};
```

---

## Tests

Run all tests: `npm run test`

Example output:

```
➜  CardGames git:(master) npm run test       

> card-games-typescript@1.1.2 test /home/rafael/proj/CardGames
> jest --verbose

 PASS  src/__tests__/Player.test.ts
  Player class
    ✓ has accessible class properties: username, credit (6ms)
    ✓ has a setCredit() class method thats overwrites the previous credit (2ms)

 PASS  src/__tests__/Deck.test.ts
  DeckOfCards
    ✓ instantiates a deck of card with 40 or 52 cards (6ms)
    ✓ has a shuffle function (1ms)
    ✓ allows to draw cards from the deck
    ✓ stand alone - has default arguments (1ms)

 PASS  src/__tests__/HigherOrLower.test.ts
  Game Higher or Lower: 
    ✓ has class attributes: dealer, players, payoffRates, numCardsPerHand (5ms)
    class constructor
      ✓ accepts input(players: PlayerHighLows[], numCardsPerHand: number, payoffRates) (2ms)
    class method deal()
      ✓ each player and dealer receive hands with correct number of cards (1ms)
      ✓ the player gets different cards
    class method setBets()
      ✓ each players gets to set a bet of x ammount on high | low | tie (1ms)
      ✓ rejects a bet if a player does not have enough credit (1ms)
      ✓ takes the bet ammount from the players credit (1ms)
    class method isWinner()
      ✓ returns true or false based on: player
    class method: payoff()
      ✓ determines the winner and pays debts to winners (1ms)
  HandHol class
    ✓ constructor takes array of Cards and sets them in cards attribute
    ✓ has attributes: numberOfCards, cards, valueCards, valueHand (1ms)
    ✓ has methods: toString (1ms)
    ✓ sets attribute valueCards to the sum of the value of each card (1ms)

 PASS  src/__tests__/Card.test.ts
  Card
    ✓ instantiates an object with correct input (3ms)
    ✓ has a property called value with type number
    ✓ has a property called unicode with type string (1ms)

Test Suites: 4 passed, 4 total
Tests:       21 passed, 21 total
Snapshots:   0 total
Time:        2s, estimated 3s
Ran all test suites.
```

---

## To Do's

---

