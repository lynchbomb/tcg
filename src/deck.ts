import { readJSONSync } from "fs-extra";
import * as jsonQuery from "json-query";
import { resolve } from "path";

import { ICard } from "./card";
import { DECKS } from "./decks";
import { Energy } from "./energy";
import { Pokemon } from "./pokemon";
import { Trainer } from "./trainer";

interface IDeck {
  pokemon: Pokemon[];
  energy: Energy[];
  trainer: Trainer[];
}

const pokedex = readJSONSync(resolve("./pokedex.json"));

export default class Deck {
  cards: IDeck = {
    pokemon: [],
    energy: [],
    trainer: [],
  };
  constructor(playerID = "marc") {
    const deckIDs = this.deckLookupTable(playerID);
    this.buildDeck(deckIDs);
  }
  // returns the ID's for the 60 cards in a deck
  private deckLookupTable(playerID: string): string[] {
    return DECKS[playerID];
  }
  private buildDeck(deckIDs: string[]): void {
    deckIDs.forEach((id) => {
      const card = this.queryBy(id)[0];
      switch (card.supertype) {
        case "Pokémon":
          this.cards.pokemon.push((card as unknown) as Pokemon);
          break;
        case "Energy":
          this.cards.energy.push((card as unknown) as Energy);
          break;
        case "Trainer":
          this.cards.trainer.push((card as unknown) as Trainer);
          break;
      }
    });
  }

  public queryBy(
    query: string,
    queryType?: "supertype" | "name" | "id"
  ): ICard[] {
    const cards: ICard[] = [];
    let typeByQuery = queryType ? queryType : "name";

    if (!queryType) {
      if (["Pokémon", "Energy", "Trainer"].includes(query)) {
        typeByQuery = "supertype";
      } else if (query.includes("-")) {
        typeByQuery = "id";
      }
    }

    console.log(`Querying Pokédex by ${typeByQuery}`);

    switch (typeByQuery) {
      case "supertype":
        cards.push(
          jsonQuery(`[*supertype=${query}]`, {
            data: pokedex,
          }).value
        );
        break;
      case "id":
        cards.push(
          jsonQuery(`[id=${query}]`, {
            data: pokedex,
          }).value
        );
        break;
      case "name":
        cards.push(
          jsonQuery(`[*name=${name}]`, {
            data: pokedex,
          }).value
        );
        break;
    }

    return cards;
  }
}
