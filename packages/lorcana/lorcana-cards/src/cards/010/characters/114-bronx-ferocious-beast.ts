import type { CharacterCard } from "@tcg/lorcana-types";

export const bronxFerociousBeast: CharacterCard = {
  id: "bvy",
  canonicalId: "ci_bvy",
  reprints: ["set10-114"],
  cardType: "character",
  name: "Bronx",
  version: "Ferocious Beast",
  i18n: {
    en: {
      name: "Bronx",
      version: "Ferocious Beast",
      text: [
        {
          title: "Reckless",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Bronx",
      version: "Grausame Bestie",
      text: "Impulsiv AM TAGE AUS STEIN Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
    },
    fr: {
      name: "Bronx",
      version: "Bête féroce",
      text: "Combattant STATUE LE JOUR Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
    },
    it: {
      name: "Bronx",
      version: "Bestia Feroce",
      text: "Attaccabrighe STATUE DI GIORNO Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
    },
  },
  inkType: ["ruby"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 114,
  rarity: "common",
  cost: 3,
  strength: 6,
  willpower: 4,
  lore: 0,
  inkable: true,
  externalIds: {
    lorcast: "crd_69fabb81a4894f389aea9207733a28c6",
    tcgPlayer: 658328,
  },
  text: [
    {
      title: "Reckless",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [
    {
      id: "ews-1",
      keyword: "Reckless",
      text: "Reckless",
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
      id: "ews-2",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "action",
    },
  ],
};
