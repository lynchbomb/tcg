import { readJSONSync } from "fs-extra";
import * as jsonQuery from "json-query";
import { resolve } from "path";

import { ICard } from "./card";
import { DECKS } from "./decks";
import { IEnergy } from "./energy";
import { IItem } from "./item";
import { IPokemon } from "./pokemon";
import { ISupport } from "./support";

interface IDeck {
  pokemon: IPokemon[];
  items: IItems[];
  support: ISupport[];
  energy: IEnergy[];
  trainer: ITrainer[];
}

export default class Deck {
  cards: IDeck = {
    pokemon: [],
    items: [],
    support: [],
    energy: [],
    trainer: [],
  };
  constructor(playerID = "marc") {
    // this.cards = decks.players["marc"];
    const deckIDs = this.deckLookupTable(playerID);
    this.buildDeck(deckIDs);
  }
  // returns the ID's for the 60 cards in a deck
  private deckLookupTable(playerID: string): string[] {
    return DECKS[playerID];
  }
  private buildDeck(deckIDs: string[]): void {
    const pokedex = readJSONSync(resolve("./static/pokedex.json"));

    deckIDs.forEach((id) => {
      // todo need a card interface
      // tcg endpoint https://api.pokemontcg.io/v1/cards/id
      const card = jsonQuery(`cards[id=${id}]`, {
        data: pokedex,
      }).value;

      switch (card.supertype) {
        case "Pokémon":
          this.cards.pokemon.push(card);
          break;
        case "Item":
          this.cards.items.push(card);
          break;
        case "Support":
          this.cards.support.push(card);
          break;
        case "Energy":
          this.cards.energy.push(card);
        case "Trainer":
          this.cards.trainer.push(card);
      }
    });
  }
}
