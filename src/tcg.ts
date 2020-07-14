import Player from "./player";
import { flipCoin } from "./utils";

type players = {
  A: Player | null;
  B: Player | null;
};

const args = process.argv;

export default class TCG {
  public players: players = { A: null, B: null };
  constructor() {
    const openingCoinFlip = flipCoin();
    // if the first player to flip the coin guesses correctly
    // then they are player.A else they are player.B
    this.players.A =
      openingCoinFlip === args[4] ? new Player(args[2]) : new Player(args[3]);

    this.players.B =
      openingCoinFlip !== args[4] ? new Player(args[2]) : new Player(args[3]);
  }
  public startGame(): void {
    //
  }
}

const tcg = new TCG();

tcg.startGame();

console.log(tcg.players.A?.deck);
console.log(tcg.players.A?.deck.cards.length);
