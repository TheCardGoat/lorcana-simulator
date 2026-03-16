import type { CharacterCard } from "@tcg/lorcana-types";

export const yaoImperialSoldier: CharacterCard = {
  id: "0wR",
  canonicalId: "ci_0wR",
  reprints: ["set4-194"],
  cardType: "character",
  name: "Yao",
  version: "Imperial Soldier",
  i18n: {
    en: {
      name: "Yao",
      version: "Imperial Soldier",
      text: "Challenger +2",
    },
    de: {
      name: "Yao",
      version: "Soldat des Kaisers",
      text: "Herausfordern +2",
    },
    fr: {
      name: "Yao",
      version: "Soldat Impérial",
      text: "Offensif +2",
    },
    it: {
      name: "Yao",
      version: "Soldato Imperiale",
      text: "Sfidante +2",
    },
  },
  inkType: ["steel"],
  franchise: "Mulan",
  set: "004",
  cardNumber: 194,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_80c0754783744500af77590d9234826c",
    tcgPlayer: 550622,
  },
  text: "Challenger +2",
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "ayj-1",
      keyword: "Challenger",
      type: "keyword",
      value: 2,
      text: "Challenger +2",
    },
  ],
};
