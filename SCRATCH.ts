/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */

import { readJSONSync } from "fs-extra";
import * as jsonQuery from "json-query";
import { resolve } from "path";

const pokedex = readJSONSync(resolve("./pokedex.json"));
// const id = "xy7-4";
// const supertype = "Pokémon";
const name = "Mew";
// const card = jsonQuery(`[id=${id}]`, {
//   data: pokedex,
// }).value;
const cards = jsonQuery(`[*supertype=${supertype}]`, {
  data: pokedex,
}).value;
// const cards = jsonQuery(`[*name=${name}]`, {
//   data: pokedex,
// }).value;

console.log(cards.length);
