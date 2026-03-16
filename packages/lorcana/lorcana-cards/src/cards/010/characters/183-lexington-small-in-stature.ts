import type { CharacterCard } from "@tcg/lorcana-types";

export const lexingtonSmallInStature: CharacterCard = {
  id: "1Mx",
  canonicalId: "ci_1Mx",
  reprints: ["set10-183"],
  cardType: "character",
  name: "Lexington",
  version: "Small in Stature",
  i18n: {
    en: {
      name: "Lexington",
      version: "Small in Stature",
      text: [
        {
          title: "Alert",
          description: "(This character can challenge as if they had Evasive.)",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Lexington",
      version: "Von kleiner Statur",
      text: [
        {
          title: "Alarmiert",
          description:
            "(Dieser Charakter kann herausfordern, als hätte er Wendig.) AM TAGE AUS STEIN Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
        },
      ],
    },
    fr: {
      name: "Lexington",
      version: "De petite stature",
      text: "Agilité (Ce personnage peut défier comme s'il avait Insaisissable.) STATUE LE JOUR Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
    },
    it: {
      name: "Lexington",
      version: "Piccoletto",
      text: [
        {
          title: "Vigile",
          description:
            "(Questo personaggio può sfidare come se avesse Sfuggente.) STATUE DI GIORNO Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 183,
  rarity: "uncommon",
  cost: 3,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_59040c22431844d18165c4f7e1c5ac2a",
    tcgPlayer: 658745,
  },
  text: [
    {
      title: "Alert",
      description: "(This character can challenge as if they had Evasive.)",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Gargoyle"],
  abilities: [
    {
      id: "wbg-1",
      keyword: "Alert",
      text: "Alert",
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
      id: "wbg-2",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "action",
    },
  ],
};
