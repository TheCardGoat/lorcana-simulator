import type { CharacterCard } from "@tcg/lorcana-types";

export const tinkerBellTemperamentalFairy: CharacterCard = {
  id: "OR6",
  canonicalId: "ci_OR6",
  reprints: ["set10-115"],
  cardType: "character",
  name: "Tinker Bell",
  version: "Temperamental Fairy",
  i18n: {
    en: {
      name: "Tinker Bell",
      version: "Temperamental Fairy",
      text: [
        {
          title: "Shift 3 {I}",
        },
        {
          title: "HARMLESS DIVERSION",
          description:
            "When you play this character, exert chosen opposing character with 2 {S} or less.",
        },
      ],
    },
    de: {
      name: "Naseweis",
      version: "Temperamentvolle Fee",
      text: "Gestaltwandel 3 HARMLOSE ABLENKUNG Wenn du diesen Charakter ausspielst, erschöpfe einen gegnerischen Charakter deiner Wahl mit 2 oder weniger.",
    },
    fr: {
      name: "La Fée Clochette",
      version: "Fée capricieuse",
      text: "Alter 3 DIVERSION INOFFENSIVE Lorsque vous jouez ce personnage, choisissez un personnage adverse ayant 2 ou moins et épuisez-le.",
    },
    it: {
      name: "Trilli",
      version: "Fata Capricciosa",
      text: "Trasformazione 3 INNOCUA DISTRAZIONE Quando giochi questo personaggio, impegna un personaggio avversario a tua scelta con 2 o inferiore.",
    },
  },
  inkType: ["ruby"],
  franchise: "Peter Pan",
  set: "010",
  cardNumber: 115,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_0a3d4d70ca5f45bfa3642a425a4943f9",
    tcgPlayer: 659191,
  },
  text: [
    {
      title: "Shift 3 {I}",
    },
    {
      title: "HARMLESS DIVERSION",
      description:
        "When you play this character, exert chosen opposing character with 2 {S} or less.",
    },
  ],
  classifications: ["Floodborn", "Ally", "Fairy"],
  abilities: [
    {
      cost: {
        ink: 3,
      },
      id: "yus-1",
      keyword: "Shift",
      text: "Shift 3 {I}",
      type: "keyword",
    },
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "opponent",
          selector: "chosen",
          zones: ["play"],
        },
        type: "exert",
      },
      id: "yus-2",
      name: "HARMLESS DIVERSION",
      text: "HARMLESS DIVERSION When you play this character, exert chosen opposing character with 2 {S} or less.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
