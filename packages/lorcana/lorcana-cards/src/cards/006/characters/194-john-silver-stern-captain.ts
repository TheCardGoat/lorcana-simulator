import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSilverSternCaptain: CharacterCard = {
  id: "9kF",
  canonicalId: "ci_9kF",
  reprints: ["set6-194"],
  cardType: "character",
  name: "John Silver",
  version: "Stern Captain",
  i18n: {
    en: {
      name: "John Silver",
      version: "Stern Captain",
      text: [
        {
          title: "Shift 5",
        },
        {
          title: "Resist +2",
        },
        {
          title: "DON'T JUST SIT THERE!",
          description: "At the start of your turn, deal 1 damage to each opposing ready character.",
        },
      ],
    },
    de: {
      name: "John Silver",
      version: "Strenger Kapitän",
      text: "Gestaltwandel 5 Robust +2 (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 2.) SITZ NICHT EINFACH HERUM! Zu Beginn deines Zuges, füge jedem gegnerischen bereiten Charakter 1 Schaden zu.",
    },
    fr: {
      name: "John Silver",
      version: "Capitaine sévère",
      text: "Alter 5 Résistance +2 NE RESTE PAS PLANTÉ LÀ! Au début de votre tour, infligez 1 dommage à chaque personnage adverse redressé.",
    },
    it: {
      name: "John Silver",
      version: "Capitano Severo",
      text: "Trasformazione 5 Resistere +2 NON STARTENE LÌ IMPALATO! All'inizio del tuo turno, infliggi 1 danno a ogni personaggio avversario preparato.",
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "006",
  cardNumber: 194,
  rarity: "legendary",
  cost: 8,
  strength: 6,
  willpower: 6,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_10eefc9e8b2943c0a29f6e19a1c114a0",
    tcgPlayer: 588130,
  },
  text: [
    {
      title: "Shift 5",
    },
    {
      title: "Resist +2",
    },
    {
      title: "DON'T JUST SIT THERE!",
      description: "At the start of your turn, deal 1 damage to each opposing ready character.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Alien", "Pirate", "Captain"],
  abilities: [
    {
      cost: {
        ink: 5,
      },
      id: "19b-1",
      keyword: "Shift",
      text: "Shift 5",
      type: "keyword",
    },
    {
      id: "19b-2",
      keyword: "Resist",
      text: "Resist +2",
      type: "keyword",
      value: 2,
    },
    {
      effect: {
        amount: 1,
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "deal-damage",
      },
      id: "19b-3",
      text: "DON'T JUST SIT THERE! At the start of your turn, deal 1 damage to each opposing ready character.",
      type: "action",
    },
  ],
};
