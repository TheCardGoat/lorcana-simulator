import type { CharacterCard } from "@tcg/lorcana-types";
import { herculesSpectralDemigodEpicI18n } from "./214-hercules-spectral-demigod-epic.i18n";

export const herculesSpectralDemigodEpic: CharacterCard = {
  id: "MXG",
  canonicalId: "ci_hMF",
  reprints: ["set11-117"],
  cardType: "character",
  name: "Hercules",
  version: "Spectral Demigod",
  inkType: ["ruby"],
  franchise: "Hercules",
  set: "011",
  cardNumber: 214,
  rarity: "common",
  specialRarity: "epic",
  cost: 1,
  strength: 0,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_366f46e2c0bc4366832935158a49cdb4",
    tcgPlayer: 677149,
  },
  text: [
    {
      title: "Boost 2 {I}",
    },
    {
      title: "SUPERHUMAN STRENGTH",
      description: "While there's a card under this character, he gets +3 {S}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Prince", "Deity", "Whisper"],
  abilities: [
    {
      id: "16g-1",
      keyword: "Boost",
      type: "keyword",
      value: 2,
      text: "Boost 2 {I}",
    },
    {
      id: "16g-2",
      effect: {
        modifier: 3,
        stat: "strength",
        target: "SELF",
        type: "modify-stat",
      },
      type: "action",
      text: "SUPERHUMAN STRENGTH While there’s a card under this character, he gets +3 {S}.",
    },
  ],
  i18n: herculesSpectralDemigodEpicI18n,
};
