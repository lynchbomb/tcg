import { Card, ICardBase } from "./card";

export interface IEnergyMeta extends ICardBase {
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
  energyMeta: IEnergyMeta;
  constructor(card: IEnergyMeta) {
    super();
    this.energyMeta = card;
  }
}
