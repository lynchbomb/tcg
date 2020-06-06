import { Card } from "./card";

export interface IEnergyMeta {
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
  constructor() {
    super();
  }
}
