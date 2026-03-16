import type { CharacterCard } from "@tcg/lorcana-types";

export const jafarWickedSorcerer: CharacterCard = {
  id: "APi",
  canonicalId: "ci_APi",
  reprints: ["set1-045"],
  cardType: "character",
  name: "Jafar",
  version: "Wicked Sorcerer",
  i18n: {
    en: {
      name: "Jafar",
      version: "Wicked Sorcerer",
      text: "Challenger +3",
    },
    de: {
      name: "Dschafar",
      version: "Hinterhältiger Hexer",
      text: "Herausfordern +3",
    },
    fr: {
      name: "JAFAR",
      version: "Sorcier maléfique",
      text: "Offensif +3",
    },
    it: {
      name: "Jafar",
      version: "Stregone Malvagio",
      text: "Sfidante +3",
    },
  },
  inkType: ["amethyst"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 45,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_695cab1b70c24a0289cc2d3c2316dfed",
    tcgPlayer: 494098,
  },
  text: "Challenger +3",
  classifications: ["Dreamborn", "Villain", "Sorcerer"],
  abilities: [
    {
      id: "1dn-1",
      keyword: "Challenger",
      type: "keyword",
      value: 3,
      text: "Challenger +3",
    },
  ],
};
