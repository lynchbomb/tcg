import type { ICardImmutableStats, TCard } from "./card";
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
    // chose which basic pokemon should be on the bench
    this.benchedPokemon = this.getBenchedPokemon();

    this.logCardStats();
    this.logViewableCards();
  }

  public getCardImmutableStats(cards: TCard[]): ICardImmutableStats[] {
    return cards.map((card) => {
      return {
        name: card.IMMUTABLE_STATS.name,
        subtype: card.IMMUTABLE_STATS.subtype,
        supertype: card.IMMUTABLE_STATS.supertype,
        id: card.IMMUTABLE_STATS.id,
        imageUrl: card.IMMUTABLE_STATS.imageUrl,
      };
    });
  }

  public logViewableCards(): void {
    const benchedPokemon = this.getCardImmutableStats(this.benchedPokemon);
    const handCards = this.getCardImmutableStats(this.handCards);

    console.log(
      `ACTIVE: ${this.activePokemon?.IMMUTABLE_STATS.supertype} :: ${this.activePokemon?.IMMUTABLE_STATS.subtype} :: ${this.activePokemon?.IMMUTABLE_STATS.name}`
    );
    benchedPokemon.map((card) => {
      console.log(
        `BENCH: ${card.supertype} :: ${card.subtype} :: ${card.name}`
      );
    });

    handCards.map((card) => {
      console.log(`HAND: ${card.supertype} :: ${card.subtype} :: ${card.name}`);
    });

    console.log(`\n`);
  }

  public logCardStats(): void {
    console.log(`PRIZE CARDS COUNT: ${this.prizeCards.length}`);
    console.log(`HAND CARDS COUNT: ${this.handCards.length}`);
    console.log(`DISCARD CARDS COUNT: ${this.discardCards.length}`);
    console.log(`DECK CARDS COUNT: ${this.deck.cards.length}`);
    console.log(`\n`);
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

  public getBenchedPokemon(): Pokemon[] {
    return this.getCardsByType<Pokemon>(this.handCards, "Pokémon", "Basic", 5);
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

  // remove cards from the players deck
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
