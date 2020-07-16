import Player from "./player";
import { flipCoin } from "./utils";

type players = {
  A: Player | null;
  B: Player | null;
};

type playerStatus = {
  active: Player | null;
  inactive: Player | null;
};

const args = process.argv;

export default class TCG {
  public players: players = { A: null, B: null };
  public playerStatus: playerStatus = { active: null, inactive: null };
  constructor() {
    const openingCoinFlip = flipCoin();
    // if the first player to flip the coin guesses correctly
    // then they are player.A else they are player.B
    // sets the first player as active
    this.playerStatus.active = this.players.A =
      openingCoinFlip === args[4] ? new Player(args[2]) : new Player(args[3]);

    this.playerStatus.inactive = this.players.B =
      openingCoinFlip !== args[4] ? new Player(args[2]) : new Player(args[3]);

    this.playerTurn();
  }
  public playerTurn(): void {
    if (this.isActivePlayerForfeited()) {
      // the game is over and the inactive player has won
      console.error(
        `${this.playerStatus.inactive?.playerID} has won the game!`
      );
    }
    this.switchActivePlayer();
  }
  public isActivePlayerForfeited(): boolean {
    // conditions to lose the game
    // if your deck is gone OR
    // if you cant play an active pokemon
    const { active } = this.playerStatus;
    return (
      active?.deck.cards.length === 0 ||
      typeof active?.activePokemon === undefined
    );
  }

  public switchActivePlayer(): void {
    const currentActivePlayer = this.playerStatus.active;
    this.playerStatus.active = this.playerStatus.inactive;
    this.playerStatus.inactive = currentActivePlayer;
  }
}

const tcg = new TCG();

tcg.playerTurn();
