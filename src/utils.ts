import { TDeck } from "./deck";

// result either 0 or 1 (heads or tails)
export function flipCoin(): string {
  const coin = ["heads", "tails"];
  const result = Math.floor(Math.random() * Math.floor(2));
  return coin[result];
}

// takes a deck, shuffles and returns
export function shuffleCards(cards: TDeck): TDeck {
  const cardsLength = cards.length - 1;
  for (let i = cardsLength; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = cards[i];

    cards[i] = cards[j];
    cards[j] = temp;
  }
  return cards;
}
