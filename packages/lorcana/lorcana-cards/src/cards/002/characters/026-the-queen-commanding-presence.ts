import type { CharacterCard } from "@tcg/lorcana-types";

export const theQueenCommandingPresence: CharacterCard = {
  id: "A9v",
  canonicalId: "ci_A9v",
  reprints: ["set2-026"],
  cardType: "character",
  name: "The Queen",
  version: "Commanding Presence",
  i18n: {
    en: {
      name: "The Queen",
      version: "Commanding Presence",
      text: [
        {
          title: "Shift 2",
        },
        {
          title: "WHO IS THE FAIREST?",
          description:
            "Whenever this character quests, chosen opposing character gets -4 {S} this turn and chosen character gets +4 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Die Königin",
      version: "Imposantes Auftreten",
      text: "Gestaltwandel 2 WER IST DIE SCHÖNSTE? Jedes Mal, wenn dieser Charakter erkundet, darfst du in diesem Zug einem gegnerischen Charakter deiner Wahl -4 und einem Charakter deiner Wahl +4 geben.",
    },
    fr: {
      name: "La Reine",
      version: "Autorité naturelle",
      text: "Alter 2 QUI EST LA PLUS BELLE? Lorsque ce personnage est envoyé à l'aventure, choisissez un personnage qui gagne +4 et un personnage adverse qui subit -4, pour le reste de ce tour.",
    },
    it: {
      name: "The Queen",
      version: "Commanding Presence",
      text: [
        {
          title: "Shift 2",
          description:
            "(You may pay 2 to play this on top of one of your characters named The Queen.) WHO IS THE FAIREST? Whenever this character quests, chosen opposing character gets -4 this turn and chosen character gets +4 this turn.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Snow White",
  set: "002",
  cardNumber: 26,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_fe74bbe0dddc45fc8ecb07ba325f1e69",
    tcgPlayer: 516386,
  },
  text: [
    {
      title: "Shift 2",
    },
    {
      title: "WHO IS THE FAIREST?",
      description:
        "Whenever this character quests, chosen opposing character gets -4 {S} this turn and chosen character gets +4 {S} this turn.",
    },
  ],
  classifications: ["Floodborn", "Villain", "Queen"],
  missingTests: true,
  abilities: [
    {
      cost: {
        ink: 2,
      },
      id: "5hw-1",
      keyword: "Shift",
      text: "Shift 2",
      type: "keyword",
    },
    {
      effect: {
        steps: [
          {
            duration: "this-turn",
            modifier: -4,
            stat: "strength",
            target: {
              selector: "chosen",
              count: 1,
              owner: "opponent",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "modify-stat",
          },
          {
            duration: "this-turn",
            modifier: 4,
            stat: "strength",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      trigger: {
        event: "quest",
        on: "SELF",
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
