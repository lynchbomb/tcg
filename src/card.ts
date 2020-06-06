export interface ICard {
  id: string;
  supertype: string;
  name: string;
}
export class Card {
  meta: ICard = { id: "", supertype: "", name: "" };
  constructor() {
    //
  }
}
