# Deck of Cards library using TypeScript

This is a very simple deck-of-cards library built using TypeScript.
This was built for personal usage, and mostly to play around with TypeScript.
Feel free to clone and to star the repo, if you feel like it.

- [Deck of Cards library using TypeScript](#deck-of-cards-library-using-typescript)
  - [Project Structure](#project-structure)
  - [The Library](#the-library)
    - [Card](#card)
    - [Deck](#deck)
  - [Example Usage](#example-usage)
  - [Tests](#tests)
  - [Games](#games)
    - [Higher or Lower](#higher-or-lower)

<hr />


## Project Structure

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


## Games

This library will define a number of Games.

### Higher or Lower

**The Higher/Lower game** consists of the following:
  * **(deal)** The dealer draws a card for himself and for the player. The players gets too see only his own cards. 
  * **(bet)** The player places a bet on his hand: lower, higher, or draw (compared to the dealer).
  * **(payoff)** The dealer pays or collects the debt.

This game can have a number of **variations**:
  * the hands may consist of one or multiple cards;
  * the hands may be returned to the deck or discarded;
  * the betting system may be more or lex comples (**see \*footnote**)
  * the payoff system may be more or lex complex;
  * this game may be played on a multiplayer table against the dealer, similar to BlackJack;
  * the bets may be for virtual currency;

To keep it relatively simple and exciting, this is **this Game's model**:
  * The Deck consists of 52 cards;
  * The hands consist of 2 cards;
  * The hands are discarded after the payoff (the deck may be restored afterwards);
  * The player starts the game with a *stake* of 5 virtual coins.
  * The player may bet any ammount of virtual coins at any given point.
  * The payoff is as follows:
    * 1:1 if player bets high or low, and wins;
    * 5:1 if player bets draw, and wins;
    * 0:1 otherwise;
  * The game finishes when the player leaves the table or looses all his *stake*.

#### *Footnote
  
A possible variation to the game may be the following:
  * **(deal)** The dealer draws a hand (at least two cards) for himself and for the player.
  * **(initial bet)** The player places a bet. 
  * **(turn)** The dealer shows one of his cards.
  * **(final bet)** The player may place a bet on his hand: lower, higher, or draw. This bet is independent from the first one.
  * **(payoff)** The dealer pays or collects the debt.

