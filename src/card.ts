import { Energy } from "./energy";
import { Pokemon } from "./pokemon";
import { Trainer } from "./trainer";

export type TCard = Pokemon | Energy | Trainer;

export interface ICardImmutableStats {
  id: string;
  supertype: string;
  name: string;
  imageUrl: string;
  subtype: string;
}

// what is common on EVERY card
export class Card {
  IMMUTABLE_STATS: ICardImmutableStats = {
    id: "",
    supertype: "",
    name: "",
    imageUrl: "",
    subtype: "",
  };
}
