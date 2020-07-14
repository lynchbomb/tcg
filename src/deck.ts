/* eslint-disable @typescript-eslint/no-unused-vars */
import { readJSONSync } from "fs-extra";
import * as jsonQuery from "json-query";
import { resolve } from "path";

import { TCard } from "./card";
import { ID_DECKS, IidCardCategories } from "./decks";
import { Energy, IEnergyImmutableStats } from "./energy";
import { IPokemonImmutableStats, Pokemon } from "./pokemon";
import { ITrainerImmutableStats, Trainer } from "./trainer";
import { shuffleCards } from "./utils";
export type TDeck = TCard[];

type TDeckMetaType =
  | IPokemonImmutableStats
  | IEnergyImmutableStats
  | ITrainerImmutableStats;

const POKEDEX = readJSONSync(resolve("./static/pokedex.json"));

export class Deck {
  public cards: TDeck;
  constructor(playerID: string) {
    // lookup marcs deck based on "marc"
    // contains a record with pokemon/trainer/energy ids
    const deckIDs = this.deckLookupTable(playerID);
    this.cards = shuffleCards(this.buildDeck(deckIDs));
  }
  // returns the ID's for the 60 cards in a deck
  private deckLookupTable(playerID: string): IidCardCategories {
    return ID_DECKS[playerID];
  }
  // iterate over a record of arrays containing card IDs
  // instantiating a new card based on supertype category
  private buildDeck(deckIDs: IidCardCategories): TDeck {
    const cards: TDeck = [];

    for (const [_key, value] of Object.entries(deckIDs)) {
      value.forEach((id: string) => {
        const card = this.queryBy(id, "id")[0];
        switch (card.supertype) {
          case "Pokémon":
            cards.push(new Pokemon(card as IPokemonImmutableStats));
            break;
          case "Energy":
            cards.push(new Energy(card as IEnergyImmutableStats));
            break;
          case "Trainer":
            cards.push(new Trainer(card as ITrainerImmutableStats));
            break;
        }
      });
    }
    return cards;
  }

  public queryBy(
    query: string,
    queryType?: "supertype" | "name" | "id"
  ): TDeckMetaType[] {
    const cards: TDeckMetaType[] = [];
    let typeByQuery = queryType ? queryType : "name";

    if (!queryType) {
      if (["Pokémon", "Energy", "Trainer"].includes(query)) {
        typeByQuery = "supertype";
      } else if (query.includes("-")) {
        typeByQuery = "id";
      }
    }

    switch (typeByQuery) {
      case "supertype":
        cards.push(
          jsonQuery(`[*supertype=${query}]`, {
            data: POKEDEX,
          }).value
        );
        break;
      case "id":
        cards.push(
          jsonQuery(`[id=${query}]`, {
            data: POKEDEX,
          }).value
        );
        break;
      case "name":
        cards.push(
          jsonQuery(`[*name=${name}]`, {
            data: POKEDEX,
          }).value
        );
        break;
    }

    return cards;
  }
}
