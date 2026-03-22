import type { CharacterCard } from "@tcg/lorcana-types";
import { mauiStubbornTricksterI18n } from "./110-maui-stubborn-trickster.i18n";

export const mauiStubbornTrickster: CharacterCard = {
  id: "axI",
  canonicalId: "ci_axI",
  reprints: ["set8-110"],
  cardType: "character",
  name: "Maui",
  version: "Stubborn Trickster",
  inkType: ["emerald", "steel"],
  franchise: "Moana",
  set: "008",
  cardNumber: 110,
  rarity: "common",
  cost: 6,
  strength: 4,
  willpower: 4,
  lore: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_e58f4c06ff8049e791b111019217c486",
    tcgPlayer: 630062,
  },
  text: "I'M NOT FINISHED YET When this character is banished, choose one:\n- Put 2 damage counters on all opposing characters.\n- Banish all opposing items.\n- Banish all opposing locations.",
  classifications: ["Storyborn", "Hero", "Deity"],
  abilities: [],
  i18n: mauiStubbornTricksterI18n,
};
