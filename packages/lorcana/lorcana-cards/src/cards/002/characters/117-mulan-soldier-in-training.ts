import type { CharacterCard } from "@tcg/lorcana-types";
import { mulanSoldierInTrainingI18n } from "./117-mulan-soldier-in-training.i18n";

export const mulanSoldierInTraining: CharacterCard = {
  id: "d6s",
  canonicalId: "ci_d6s",
  reprints: ["set2-117"],
  cardType: "character",
  name: "Mulan",
  version: "Soldier in Training",
  inkType: ["ruby"],
  franchise: "Mulan",
  set: "002",
  cardNumber: 117,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_ddd89c441cdd4795907313f38e85c1e7",
    tcgPlayer: 518786,
  },
  text: "Rush",
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "x7m-1",
      keyword: "Rush",
      type: "keyword",
      text: "Rush",
    },
  ],
  i18n: mulanSoldierInTrainingI18n,
};
