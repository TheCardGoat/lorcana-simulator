import type { CharacterCard } from "@tcg/lorcana-types";

export const donaldDuckStruttingHisStuff: CharacterCard = {
  id: "fpc",
  canonicalId: "ci_fpc",
  reprints: ["set1-144"],
  cardType: "character",
  name: "Donald Duck",
  version: "Strutting His Stuff",
  i18n: {
    en: {
      name: "Donald Duck",
      version: "Strutting His Stuff",
      text: "Ward",
    },
    de: {
      name: "Donald Duck",
      version: "Stolziert umher",
      text: "Behütet",
    },
    fr: {
      name: "DONALD",
      version: "Inventeur fanfaron",
      text: "Hors d'atteinte",
    },
    it: {
      name: "Donald Duck",
      version: "Strutting His Stuff",
      text: [
        {
          title: "Ward",
          description: "(Opponents can't choose this character except to challenge.)",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  set: "001",
  cardNumber: 144,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_8d5ff9b706fd4f59b44e0ca52638a257",
    tcgPlayer: 503358,
  },
  text: "Ward",
  classifications: ["Dreamborn", "Hero", "Inventor"],
  abilities: [
    {
      id: "10b-1",
      keyword: "Ward",
      type: "keyword",
      text: "Ward",
    },
  ],
};
