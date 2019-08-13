# Deck of Cards library using TypeScript

This is a very simple deck-of-cards library built using TypeScript.
This was built for personal usage, and mostly to play around with TypeScript.
Feel free to clone and to star the repo, if you feel like it.


<hr />


## Table of Contents

- [Deck of Cards library using TypeScript](#deck-of-cards-library-using-typescript)
  - [Table of Contents](#table-of-contents)
  - [Installation and usage](#installation-and-usage)
    - [Node.js](#nodejs)
    - [TypeScript](#typescript)
  - [Project Structure](#project-structure)
  - [The Library](#the-library)
    - [Card](#card)
    - [Deck](#deck)
  - [Example Usage](#example-usage)
  - [Tests](#tests)
  - [To Do's](#to-dos)


<hr />


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


<hr />


## Project Structure

This is the current structure of this library.

* The library login is contained in `/src`;
* The library compiles to a `/dist` directory;

```
.
├── src                         # The source code
│   ├── HigherOrLower.ts
│   │   └── index.ts
│   ├── Card.ts
│   ├── Deck.ts
│   ├── index.ts
│   └── misc.ts
├── tests                     # The unit-tests
│   ├── Card.test.js
│   └── Deck.test.js
├── build                     # TypeScript complilation output
│   ├── Card.js
│   ├── Deck.js
│   └── misc.js
├── jest.config.js
├── package.json
├── package-lock.json
├── tsconfig.json 
├── main.js                  # Example usage script
└── README.md
```

<hr />


## The Library

This library consists of two main classes: `Card` and `DeckOfCards`.

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

<hr />

## Example Usage

```
➜  CardGames git:(master) ✗ npm run example

> CardGames@1.0.0 example /home/rafael/proj/CardGames
> node main.js

Running basic example

This is the deck after being built:
2 ♥	 3 ♥	 4 ♥	 5 ♥	 6 ♥	 7 ♥	 J ♥	 Q ♥	 K ♥	 A ♥	 2 ♠	 3 ♠	 4 ♠	 5 ♠	 6 ♠	 7 ♠	 J ♠	 Q ♠	 K ♠	 A ♠	 2 ♦	 3 ♦	 4 ♦	 5 ♦	 6 ♦	 7 ♦	 J ♦	 Q ♦	 K ♦	 A ♦	 2 ♣	 3 ♣	 4 ♣	 5 ♣	 6 ♣	 7 ♣	 J ♣	 Q ♣	 K ♣	 A ♣	
Shuffling deck of cards

This is the deck after being shuffled:
4 ♣	 A ♠	 4 ♦	 2 ♠	 Q ♥	 K ♣	 5 ♥	 6 ♠	 7 ♥	 6 ♥	 J ♣	 3 ♥	 5 ♦	 2 ♦	 Q ♦	 4 ♥	 J ♥	 7 ♣	 K ♦	 7 ♠	 7 ♦	 3 ♠	 A ♦	 A ♣	 2 ♣	 3 ♣	 K ♥	 3 ♦	 5 ♣	 6 ♣	 Q ♠	 J ♦	 J ♠	 2 ♥	 5 ♠	 A ♥	 Q ♣	 4 ♠	 K ♠	 6 ♦	

Drawing some cards...
Card 1 - 6 ♦
Card 2 - K ♠
Card 3 - 4 ♠
Card 4 - Q ♣
Card 5 - A ♥
```


<hr />


## Tests

Run all tests with

```bash
npm run test
```


Example output:

```
➜  CardGames git:(master) ✗ jest --verbose
 PASS  tests/Deck.test.js
  DeckOfCards
    ✓ instantiates a deck of card with 40 or 52 cards (2ms)
    ✓ has a shuffle function (1ms)
    ✓ allows to draw cards from the deck

 PASS  tests/Card.test.js
  Card
    ✓ instantiates an object with correct input
    ✓ has a property called value (1ms)

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.377s
```


<hr />


## To Do's

Track the issues and to-do's of this library:

#### First iteration result

This game part of the source code will require some refactoring, and above all,
making the code more logic and robust.
Remember, the code should be built as to interact via API - aka JSON.

In any case, here's the output

```
  console.log src/HigherOrLower/index.ts:63
    
          Dealer draws, facing down, two cards for himself and other for the player.
          Upon seeing his hand (♣K ♠9 => 22 points),         the players (credit: 15) places a bet: 
          2$ on draw!
          The dealer shows his hand (♠10 ♦Q => 22 points )
          The player wins!
          Current credit: 15$.
        

  console.log src/HigherOrLower/index.ts:63
    
          Dealer draws, facing down, two cards for himself and other for the player.
          Upon seeing his hand (♦8 ♣6 => 14 points),         the players (credit: 16) places a bet: 
          1$ on high!
          The dealer shows his hand (♥6 ♥5 => 11 points )
          The player wins!
          Current credit: 16$.
        

  console.log src/HigherOrLower/index.ts:63
    
          Dealer draws, facing down, two cards for himself and other for the player.
          Upon seeing his hand (♣7 ♥9 => 16 points),         the players (credit: 9) places a bet: 
          7$ on low!
          The dealer shows his hand (♠3 ♠Q => 15 points )
          The player looses!
          Current credit: 9$.
        

  console.log src/HigherOrLower/index.ts:63
    
          Dealer draws, facing down, two cards for himself and other for the player.
          Upon seeing his hand (♦10 ♥4 => 14 points),         the players (credit: 16) places a bet: 
          7$ on low!
          The dealer shows his hand (♥K ♦2 => 15 points )
          The player wins!
          Current credit: 16$.
```
