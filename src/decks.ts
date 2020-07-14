export interface IidDecks {
  [key: string]: IidCardCategories;
}

export interface IidCardCategories {
  pokemon: string[];
  trainer: string[];
  energy: string[];
}

// marcs deck from 6/6/20
const idDeck = {
  pokemon: [
    "sm35-15",
    "sm35-17",
    "sm35-16",
    "sm35-16",
    "xy12-43",
    "xy12-43",
    "xy12-44",
    "xy12-44",
    "xy10-74",
    "swsh1-143",
    "xy12-45",
    "xy12-50",
    "swsh2-88",
    "sm35-44",
    "sm35-43",
    "xy10-3",
    "xy10-2",
    "xy10-8",
    "swsh1-12",
    "swsh1-10",
  ],
  trainer: [
    "xy0-39",
    "xy0-39",
    "xy0-39",
    "xy6-94",
    "xy6-94",
    "xy8-146",
    "xy8-146",
    "g1-68",
    "g1-68",
    "xy6-91",
    "xy6-91",
    "sm35-59",
    "xy2-94",
    "xy10-97",
    "sm35-66",
    "sm35-65",
  ],
  energy: [
    "bw1-105",
    "bw1-105",
    "bw1-105",
    "bw1-105",
    "gym1-128",
    "gym1-128",
    "gym1-128",
    "gym1-128",
    "gym1-128",
    "gym1-128",
    "gym1-128",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
    "gym2-131",
  ],
};

export const ID_DECKS: IidDecks = {
  marc: idDeck,
  jonah: idDeck,
  sienna: idDeck,
  ryan: idDeck,
};
