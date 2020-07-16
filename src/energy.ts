import type { ICardImmutableStats } from "./card";
import { Card } from "./card";

export interface IEnergyImmutableStats extends ICardImmutableStats {
  energyTypes:
    | "grass"
    | "fire"
    | "water"
    | "lightning"
    | "psychic"
    | "fighting"
    | "darkness"
    | "metal"
    | "fairy"
    | "dragon"
    | "colorless";
}
export class Energy extends Card {
  constructor(card: IEnergyImmutableStats) {
    super();
    this.IMMUTABLE_STATS = card;
  }
}
