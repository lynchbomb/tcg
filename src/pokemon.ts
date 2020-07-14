import { Card, ICardImmutableStats } from "./card";
import { IEnergyImmutableStats } from "./energy";
export interface IPokemonImmutableStats extends ICardImmutableStats {
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
  cost: IEnergyImmutableStats["energyTypes"][];
  name: string;
  damage: number;
  description: string;
  convertedEnergyCost: number;
};

export class Pokemon extends Card {
  activeCondition: conditions = "none";
  activeHitPoints = 0;
  isActive = false;
  isBenched = false;
  constructor(card: IPokemonImmutableStats) {
    super();
    this.IMMUTABLE_STATS = card;
  }
}
