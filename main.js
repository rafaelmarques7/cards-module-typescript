const { DeckOfCards } = require('./build/Deck');

console.log(`Running basic example`);

// Build the deck with 52 cards
const Deck = new DeckOfCards(40);
console.log(`\nThis is the deck after being built:`);
console.log(`${Deck.deck.map(card => `${card.value}\t`).join(' ')}`);

// Shuffle the deck
Deck.shuffleDeck();
console.log(`\nThis is the deck after being shuffled:`);
console.log(`${Deck.deck.map(card => `${card.value}\t`).join(' ')}`);

// Draw some cards
console.log(`\nDrawing some cards...`)
for (let index = 1; index < 6; index++) {
  let card = Deck.drawCard();
  console.log(`Card ${index} - ${card.value}`);  
}

