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
    this.setPlayerOrder();
    this.playerTurn();
  }

  // if the first player to flip the coin guesses correctly
  // then they are player.A else they are player.B
  // sets the first player as active
  public setPlayerOrder(): void {
    const openingCoinFlip = flipCoin();

    this.playerStatus.active = this.players.A =
      openingCoinFlip === args[4] ? new Player(args[2]) : new Player(args[3]);

    this.playerStatus.inactive = this.players.B =
      openingCoinFlip !== args[4] ? new Player(args[2]) : new Player(args[3]);
  }

  //
  public playerTurn(): void {
    if (this.isActivePlayerForfeited()) {
      // the game is over and the inactive player has won
      console.error(
        `${this.playerStatus.inactive?.playerID} has won the game!`
      );
    }

    this.activePlayerTakeTurn();

    this.switchActivePlayer();
  }

  public activePlayerTakeTurn(): void {
    // this will contain
    // take a card from deck
    this.playerStatus.active?.drawCards();
    // play item cards
    // play supporter card
    // put down all basic pokemon
    // evolve any basic
    // put down energy card first on active if it needs it
    // then if it doesn't put it on the most powerful benched pokemon
    // check for benched pokemon abilities
    // attack with basic pokemon if you can
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
    // lets say its ryan turn he is the active player
    const currentActivePlayer = this.playerStatus.active;
    // now the active player is uncle marc
    this.playerStatus.active = this.playerStatus.inactive;
    // now the inactive player is ryan
    this.playerStatus.inactive = currentActivePlayer;
  }
}

// this means its a new game of the card game
const tcg = new TCG();

//
tcg.playerTurn();
