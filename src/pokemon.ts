import { Card, ICardBase } from "./card";
import { IEnergyMeta } from "./energy";
export interface IPokemonMeta extends ICardBase {
  types: string[];
  evolvesFrom: string;
  ability: Record<string, string>;
  hp: string;
  retreatCost: string[];
  convertedRetreatCost: number;
  attacks: attack[];
  resistances: resistance[];
  weaknesses: weakness[];
}

type weakness = {
  type: string;
  value: string;
};

type resistance = {
  type: string;
  value: string;
};

type conditions =
  | "asleep"
  | "burned"
  | "confused"
  | "paralyzed"
  | "poisoned"
  | "none";

type attack = {
  cost: IEnergyMeta["energyTypes"][];
  name: string;
  damage: number;
  description: string;
  convertedEnergyCost: number;
};

export class Pokemon extends Card {
  pokemonMeta: IPokemonMeta;
  condition: conditions = "none";
  constructor(card: IPokemonMeta) {
    super();
    this.pokemonMeta = card;
  }
}
