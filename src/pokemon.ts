export interface IPokemonMeta {
  energyTypes:
    | "grass"
    | "fire"
    | "water"
    | "lightning"
    | "psychic"
    | "fighting"
    | "darkness"
    | "metal"
    | "fairy"
    | "dragon"
    | "colorless";
  conditions:
    | "asleep"
    | "burned"
    | "confused"
    | "paralyzed"
    | "poisoned"
    | "none";
}

type attack = {
  cost: IPokemonMeta["energyTypes"][];
  name: string;
  damage: number;
  description: string;
};

export interface IPokemon {
  weakness: { energyType: IPokemonMeta["energyTypes"]; value: number };
  resistance: { energyType: IPokemonMeta["energyTypes"]; value: number };
  retreatCost: number;
  condition: IPokemonMeta["conditions"];
  attacks: attack[];
}

export default class Pokemon implements IPokemon {
  condition: IPokemon["condition"] = "none";
  weakness: IPokemon["weakness"];
  constructor() {}
  conditionStatus(condition?: IPokemon["condition"]): IPokemon["condition"] {
    if (condition) {
      this.condition = condition;
    }
    return this.condition;
  }
}
