/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-unused-vars */

// import { readJSONSync } from "fs-extra";
// import * as jsonQuery from "json-query";
// import { resolve } from "path";

// const pokedex = readJSONSync(resolve("./pokedex.json"));
// // const id = "xy7-4";
// // const supertype = "Pokémon";
// const name = "Mew";
// // const card = jsonQuery(`[id=${id}]`, {
// //   data: pokedex,
// // }).value;
// const cards = jsonQuery(`[*supertype=${supertype}]`, {
//   data: pokedex,
// }).value;
// // const cards = jsonQuery(`[*name=${name}]`, {
// //   data: pokedex,
// // }).value;

// console.log(cards.length);

// import { Deck } from "./src/deck";

// const d = new Deck();

// console.log(d.cards.pokemon);
const deckIDS = {
  pokemon: [1, 2, 3],
  trainer: [654, 789, 456],
  energy: [987, 564, 126],
};

for (const [key, value] of Object.entries(deckIDS)) {
  console.log(`${key}: ${value}`);
}

// expected output:
// "a: somestring"
// "b: 42"
// order is not guaranteed
