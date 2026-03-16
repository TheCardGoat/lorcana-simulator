import type { CharacterCard } from "@tcg/lorcana-types";

export const brooklynSecondInCommand: CharacterCard = {
  id: "jg3",
  canonicalId: "ci_jg3",
  reprints: ["set10-120"],
  cardType: "character",
  name: "Brooklyn",
  version: "Second in Command",
  i18n: {
    en: {
      name: "Brooklyn",
      version: "Second in Command",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Brooklyn",
      version: "Zweiter Befehlshaber",
      text: "Wendig AM TAGE AUS STEIN Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
    },
    fr: {
      name: "Brooklyn",
      version: "Bras droit",
      text: "Insaisissable STATUE LE JOUR Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
    },
    it: {
      name: "Brooklyn",
      version: "Secondo in Comando",
      text: "Sfuggente STATUE DI GIORNO Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
    },
  },
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 120,
  rarity: "common",
  cost: 2,
  strength: 3,
  willpower: 2,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_07d54e366c0548e6890cee09e3eaa032",
    tcgPlayer: 659241,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [
    {
      id: "nda-1",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["hand"],
          },
          comparison: {
            operator: "gte",
            value: 3,
          },
        },
        then: {
          restriction: "cant-ready",
          target: "SELF",
          type: "restriction",
        },
        type: "conditional",
      },
      id: "nda-2",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "action",
    },
  ],
};
