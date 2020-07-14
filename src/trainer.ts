import { Card, ICardBase } from "./card";

export interface ITrainerMeta extends ICardBase {
  text: string;
}
export class Trainer extends Card {
  trainerMeta: ITrainerMeta;
  constructor(card: ITrainerMeta) {
    super();
    this.trainerMeta = card;
  }
}
