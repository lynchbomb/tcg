import { Card } from "./card";

export interface ITrainer {
  id: string;
  supertype: string;
  name: string;
}
export class Trainer extends Card {
  constructor() {
    super();
  }
}
