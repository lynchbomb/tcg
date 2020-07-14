import { Deck } from "./deck";

export default class Player {
  public playerID: string;
  public deck: Deck;

  constructor(playerID: string) {
    this.playerID = playerID;
    // grabs the players deck and
    // instantiates a class
    this.deck = new Deck(playerID);
  }
}
