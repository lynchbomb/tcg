import Player from "./player";
import Pokemon from "./pokemon";
import { flipCoin } from "./utils";

type players = {
  A: string;
  B: string;
};

export default class TCG {
  public players: players = { A: "", B: "" };
  constructor(players: string[]) {
    this.players.A = new Player(players[0]);
    this.players.B = new Player(players[1]);
  }
  public startGame() {}
}

const tcg = new TCG(["marc", "jonah"]);

tcg.startGame();
