import type { CharacterCard } from "@tcg/lorcana-types";

export const queenOfHeartsSensingWeakness: CharacterCard = {
  id: "DCW",
  canonicalId: "ci_Il0",
  reprints: ["set2-120", "set9-120"],
  cardType: "character",
  name: "Queen of Hearts",
  version: "Sensing Weakness",
  i18n: {
    en: {
      name: "Queen of Hearts",
      version: "Sensing Weakness",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "LET THE GAME BEGIN",
          description:
            "Whenever one of your characters challenges another character, you may draw a card.",
        },
      ],
    },
    de: {
      name: "Die Herzkönigin",
      version: "Wittert Schwäche",
      text: "Gestaltwandel 2 DANN SOLL DAS SPIEL BEGINNEN! Jedes Mal, wenn einer deiner Charaktere einen gegnerischen Charakter herausfordert, darfst du 1 Karte ziehen.",
    },
    fr: {
      name: "La Reine de Cœur",
      version: "Utilise les faiblesses",
      text: "Alter 2 QUE LA PARTIE COMMENCE Chaque fois que l'un de vos personnages en défie un autre, vous pouvez piocher une carte.",
    },
    it: {
      name: "Queen of Hearts",
      version: "Sensing Weakness",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named Queen of Hearts.) LET THE GAME BEGIN Whenever one of your characters challenges another character, you may draw a card.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 120,
  rarity: "uncommon",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_51f0f91029254f61ab6d7b91efb0873b",
    tcgPlayer: 647670,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "LET THE GAME BEGIN",
      description:
        "Whenever one of your characters challenges another character, you may draw a card.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Queen"],
  missingTests: true,
  abilities: [
    {
      id: "1je-1",
      cost: {
        ink: 2,
      },
      keyword: "Shift",
      type: "keyword",
      text: "Shift 2 {I}",
    },
    {
      id: "1je-2",
      effect: {
        chooser: "CONTROLLER",
        effect: {
          amount: 1,
          target: "CONTROLLER",
          type: "draw",
        },
        type: "optional",
      },
      name: "LET THE GAME BEGIN",
      trigger: {
        event: "banish",
        timing: "whenever",
        on: "YOUR_OTHER_CHARACTERS",
      },
      type: "triggered",
      text: "LET THE GAME BEGIN Whenever one of your characters challenges another character, you may draw a card.",
    },
  ],
};
