// result either 0 or 1 (heads or tails)
export function flipCoin(): string {
  const coin = ["heads", "tails"];
  const result = Math.floor(Math.random() * Math.floor(2));
  return coin[result];
}
