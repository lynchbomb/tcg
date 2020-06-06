/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable filenames/match-regex */
/* eslint-disable @typescript-eslint/no-var-requires */

import { readJSONSync } from "fs-extra";
import * as jsonQuery from "json-query";
import { resolve } from "path";

const pokedex = readJSONSync(resolve("./pokedex.json"));

const card = jsonQuery(`cards[id=${id}]`, {
  data: pokedex,
}).value;

console.log(card);
