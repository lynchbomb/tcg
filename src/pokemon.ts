import { Card } from "./card";
import { IEnergyMeta } from "./energy";
export interface IPokemonMeta {
  energyTypes: IEnergyMeta["energyTypes"];
  conditions:
    | "asleep"
    | "burned"
    | "confused"
    | "paralyzed"
    | "poisoned"
    | "none";
}

type attack = {
  cost: IEnergyMeta["energyTypes"][];
  name: string;
  damage: number;
  description: string;
};

export interface IPokemon {
  weakness: { energyType: IEnergyMeta["energyTypes"]; value: number };
  resistance: { energyType: IEnergyMeta["energyTypes"]; value: number };
  retreatCost: number;
  condition: IPokemonMeta["conditions"];
  attacks: attack[];
}

export class Pokemon extends Card implements IPokemon {
  condition: IPokemon["condition"] = "none";
  weakness: IPokemon["weakness"];
  constructor() {
    super();
  }
  conditionStatus(condition?: IPokemon["condition"]): IPokemon["condition"] {
    if (condition) {
      this.condition = condition;
    }
    return this.condition;
  }
}
