import type { CharacterCard } from "@tcg/lorcana-types";

export const captainHookForcefulDuelist: CharacterCard = {
  id: "WLW",
  canonicalId: "ci_ZXl",
  reprints: ["set1-174", "set8-186"],
  cardType: "character",
  name: "Captain Hook",
  version: "Forceful Duelist",
  i18n: {
    en: {
      name: "Captain Hook",
      version: "Forceful Duelist",
      text: "Challenger +2",
    },
    de: {
      name: "Captain Hook",
      version: "Forceful Duelist",
      text: "Challenger +2 (While challenging, this character gets +2.)",
    },
    fr: {
      name: "Captain Hook",
      version: "Forceful Duelist",
      text: "Challenger +2 (While challenging, this character gets +2.)",
    },
    it: {
      name: "Captain Hook",
      version: "Forceful Duelist",
      text: "Challenger +2 (While challenging, this character gets +2.)",
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "008",
  cardNumber: 186,
  rarity: "common",
  cost: 1,
  strength: 1,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_269551f76e10446cbf947278bf155889",
    tcgPlayer: 631706,
  },
  text: "Challenger +2",
  classifications: ["Dreamborn", "Villain", "Pirate", "Captain"],
  abilities: [
    {
      id: "bhv-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
