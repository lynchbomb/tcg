import type { ICardImmutableStats } from "./card";
import { Card } from "./card";

export interface ITrainerImmutableStats extends ICardImmutableStats {
  text: string;
}
export class Trainer extends Card {
  constructor(card: ITrainerImmutableStats) {
    super();
    this.IMMUTABLE_STATS = card;
  }
}
