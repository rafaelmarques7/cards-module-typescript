const { DeckOfCards } = require('./compiled/Deck');


const deck = new DeckOfCards(52);
console.log(deck.deck);
deck.shuffleDeck(3)
console.log('\n\n\n\n\n\n\n');
console.log(deck.deck);

for (let index = 0; index < 55; index++) {
  let card = deck.drawCard();
  console.log(card);  
}