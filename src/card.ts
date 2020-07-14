import { Energy } from "./energy";
import { Pokemon } from "./pokemon";
import { Trainer } from "./trainer";

export type TCard = Pokemon | Energy | Trainer;

export interface ICardBase {
  id: string;
  supertype: string;
  name: string;
  imageUrl: string;
  subtype: string;
}

// what is common on EVERY card
export class Card {
  meta: ICardBase = {
    id: "",
    supertype: "",
    name: "",
    imageUrl: "",
    subtype: "",
  };
}
