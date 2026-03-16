import type { CharacterCard } from "@tcg/lorcana-types";

export const rollyHungryPup: CharacterCard = {
  id: "5D2",
  canonicalId: "ci_5D2",
  reprints: ["set3-021"],
  cardType: "character",
  name: "Rolly",
  version: "Hungry Pup",
  i18n: {
    en: {
      name: "Rolly",
      version: "Hungry Pup",
      text: "Support",
    },
    de: {
      name: "Rolly",
      version: "Hungriger Welpe",
      text: "Unterstützen (Jedes Mal, wenn dieser Charakter erkundet, darfst du seine in diesem Zug zur eines anderen Charakters deiner Wahl addieren.)",
    },
    fr: {
      name: "Rolly",
      version: "Chiot affamé",
      text: "Soutien",
    },
    it: {
      name: "Rolly",
      version: "Piccolo Affamato",
      text: "Aiutante",
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 21,
  rarity: "uncommon",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_2e4b186b853e4bd7b5d3144645efd6a1",
    tcgPlayer: 538353,
  },
  text: "Support",
  classifications: ["Storyborn", "Puppy"],
  abilities: [
    {
      id: "evp-1",
      keyword: "Support",
      type: "keyword",
      text: "Support",
    },
  ],
};
