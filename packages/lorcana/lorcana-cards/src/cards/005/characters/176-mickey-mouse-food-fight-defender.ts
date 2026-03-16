import type { CharacterCard } from "@tcg/lorcana-types";

export const mickeyMouseFoodFightDefender: CharacterCard = {
  id: "z89",
  canonicalId: "ci_z89",
  reprints: ["set5-176"],
  cardType: "character",
  name: "Mickey Mouse",
  version: "Food Fight Defender",
  i18n: {
    en: {
      name: "Mickey Mouse",
      version: "Food Fight Defender",
      text: "Resist +1",
    },
    de: {
      name: "Micky Maus",
      version: "Essensschlacht-Verteidiger",
      text: "Robust +1 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
    },
    fr: {
      name: "Mickey Mouse",
      version: "Défenseur de la bataille de nourriture",
      text: "Résistance +1",
    },
    it: {
      name: "Topolino",
      version: "Difensore nella Battaglia di Cibo",
      text: "Resistere +1",
    },
  },
  inkType: ["steel"],
  set: "005",
  cardNumber: 176,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3fcdfc49c12743bea7e8f632ba06c41b",
    tcgPlayer: 561848,
  },
  text: "Resist +1",
  classifications: ["Storyborn", "Hero"],
  abilities: [
    {
      id: "1m7-1",
      keyword: "Resist",
      type: "keyword",
      value: 1,
      text: "Resist +1",
    },
  ],
};
