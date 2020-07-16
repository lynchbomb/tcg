import type { TCard } from "./card";
import { Deck } from "./deck";
import { Pokemon } from "./pokemon";
import { shuffleCards } from "./utils";
export default class Player {
  public playerID = "";
  public deck: Deck;
  public prizeCards: TCard[] = [];
  public discardCards: TCard[] = [];
  public handCards: TCard[] = [];
  public benchedPokemon: Pokemon[] = [];
  public activePokemon: Pokemon | undefined;
  constructor(playerID: string) {
    // grabs the players deck
    // instantiates a class and shuffles
    this.deck = new Deck(playerID);
    this.setup(playerID);
  }

  public setup(playerID: string): void {
    // sets player id
    this.playerID = playerID;
    // draw 7 hand cards
    this.drawCards(7);
    // if no basic pokemon reset hand
    this.validateHandCardLoop();
    console.log(`hand cards validated for ${this.playerID}`);
    // draw 6 prize cards from the deck and shuffle
    this.prizeCards = this.deck.drawCards(6);
    shuffleCards(this.deck.cards);
    // chose which basic pokemon should be active
    this.activePokemon = this.getActivePokemon();
    console.log(`active pokemon set as ${JSON.stringify(this.activePokemon)}`);
    console.log(`prize cards should equal 6 ${this.prizeCards.length}`);
    console.log(`hand cards should equal 6 ${this.handCards.length}`);
    console.log(`discard should equal 0 ${this.discardCards.length}`);
    console.log(`deck should equal 47 ${this.deck.cards.length}\n\n`);
    // chose which basic pokemon should be on the bench
    this.setBenchedPokemon();
  }

  // get the active pokemon from cards in your hand
  public getActivePokemon(): Pokemon {
    return this.getCardsByType<Pokemon>(
      this.handCards,
      "Pokémon",
      "Basic",
      1
    )[0];
  }

  public setBenchedPokemon(): void {
    //
  }

  public getCardsByType<T>(
    cardsMutable: TCard[],
    supertype: string,
    subtype: string,
    count = 1
  ): T[] {
    const matchedCards: T[] = [];
    let counter = 0;

    let i = cardsMutable.length;
    while (i--) {
      if (counter === count) {
        break;
      }
      if (
        cardsMutable[i].IMMUTABLE_STATS.supertype === supertype &&
        cardsMutable[i].IMMUTABLE_STATS.subtype === subtype
      ) {
        matchedCards.push((cardsMutable[i] as unknown) as T);
        cardsMutable.splice(i, 1);
        counter++;
      }
    }

    return matchedCards;
  }

  // draws a prize card from prize cards
  // puts the cards into the hand
  public drawPrizeCards(count = 1): void {
    const cards = this.prizeCards.splice(0, count);
    cards.map((card) => {
      this.handCards.push(card);
    });
  }

  // draw card from the players deck
  // puts the cards into the hand
  public drawCards(count = 1): void {
    this.deck.drawCards(count).map((card) => {
      this.handCards.push(card);
    });
  }

  private validateHandCardLoop(): void {
    if (!this.validateHandCards(this.handCards)) {
      this.reDrawHandCards();
      this.validateHandCardLoop();
    }
  }

  private reDrawHandCards(): void {
    console.log(`redrawing handcards for ${this.playerID}`);
    // put the handcards back into the deck
    this.handCards.map((card) => {
      this.deck.cards.push(card);
    });
    // clear the handcards
    this.handCards = [];
    // shuffle the deck
    shuffleCards(this.deck.cards);
    // draw 7 cards
    this.drawCards(7);
  }

  private validateHandCards(cards: TCard[]): boolean {
    function isBasicPokemon(card: TCard): boolean {
      return (
        card.IMMUTABLE_STATS.supertype === "Pokémon" &&
        card.IMMUTABLE_STATS.subtype === "Basic"
      );
    }

    return cards.some(isBasicPokemon);
  }
}
