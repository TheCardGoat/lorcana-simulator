import type { CharacterCard } from "@tcg/lorcana-types";

export const arthurNoviceSparrow: CharacterCard = {
  id: "WQv",
  canonicalId: "ci_WQv",
  reprints: ["set5-121"],
  cardType: "character",
  name: "Arthur",
  version: "Novice Sparrow",
  i18n: {
    en: {
      name: "Arthur",
      version: "Novice Sparrow",
      text: "Reckless",
    },
    de: {
      name: "Arthur",
      version: "Spatz-Anfänger",
      text: "Impulsiv",
    },
    fr: {
      name: "Arthur",
      version: "Moineau novice",
      text: "Combattant",
    },
    it: {
      name: "Artù",
      version: "Passerotto Principiante",
      text: "Attaccabrighe",
    },
  },
  inkType: ["ruby"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 121,
  rarity: "uncommon",
  cost: 1,
  strength: 2,
  willpower: 3,
  lore: 0,
  inkable: false,
  externalIds: {
    lorcast: "crd_51db72cea0fc47c7a261bea9f511d4eb",
    tcgPlayer: 561466,
  },
  text: "Reckless",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "bn1-1",
      keyword: "Reckless",
      type: "keyword",
      text: "Reckless",
    },
  ],
};
