import type { CharacterCard } from "@tcg/lorcana-types";

export const demonaBetrayerOfTheClan: CharacterCard = {
  id: "dX5",
  canonicalId: "ci_dX5",
  reprints: ["set10-040"],
  cardType: "character",
  name: "Demona",
  version: "Betrayer of the Clan",
  i18n: {
    en: {
      name: "Demona",
      version: "Betrayer of the Clan",
      text: [
        {
          title: "Challenger +2",
        },
        {
          title: "STONE BY DAY",
          description: "If you have 3 or more cards in your hand, this character can't ready.",
        },
      ],
    },
    de: {
      name: "Demona",
      version: "Verräterin des Clans",
      text: "Herausfordern +2 AM TAGE AUS STEIN Solange du 3 oder mehr Karten auf der Hand hast, kann dieser Charakter nicht bereit gemacht werden.",
    },
    fr: {
      name: "Démona",
      version: "Traîtresse du clan",
      text: "Offensif +2 STATUE LE JOUR Ce personnage ne peut pas se redresser si vous avez 3 cartes ou plus en main.",
    },
    it: {
      name: "Demona",
      version: "Traditrice del Clan",
      text: "Sfidante +2 STATUE DI GIORNO Se hai 3 o più carte in mano, questo personaggio non si può preparare.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Gargoyles",
  set: "010",
  cardNumber: 40,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 6,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_35f7836ceed84e21ba7cfdde813d73bc",
    tcgPlayer: 658503,
  },
  text: [
    {
      title: "Challenger +2",
    },
    {
      title: "STONE BY DAY",
      description: "If you have 3 or more cards in your hand, this character can't ready.",
    },
  ],
  classifications: ["Storyborn", "Villain", "Gargoyle", "Sorcerer"],
  abilities: [
    {
      id: "t99-1",
      keyword: "Challenger",
      text: "Challenger +2",
      type: "keyword",
      value: 2,
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
      id: "t99-2",
      text: "STONE BY DAY If you have 3 or more cards in your hand, this character can't ready.",
      type: "action",
    },
  ],
};
