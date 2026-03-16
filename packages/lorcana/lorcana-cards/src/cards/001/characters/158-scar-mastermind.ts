import type { CharacterCard } from "@tcg/lorcana-types";

export const scarMastermind: CharacterCard = {
  id: "yBp",
  canonicalId: "ci_yBp",
  reprints: ["set1-158"],
  cardType: "character",
  name: "Scar",
  version: "Mastermind",
  i18n: {
    en: {
      name: "Scar",
      version: "Mastermind",
      text: [
        {
          title: "INSIDIOUS PLOT",
          description:
            "When you play this character, chosen opposing character gets -5 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Scar",
      version: "Drahtzieher",
      text: [
        {
          title: "HEIMTÜCKISCHER PLAN",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem gegnerischen Charakter deiner Wahl in diesem Zug -5.",
        },
      ],
    },
    fr: {
      name: "SCAR",
      version: "Manipulateur",
      text: [
        {
          title: "COMPLOT INSIDIEUX",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage adverse qui subit -5 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Scar",
      version: "Mastermind",
      text: [
        {
          title: "INSIDIOUS PLOT",
          description: "When you play this character, chosen opposing character gets –5 this turn.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Lion King",
  set: "001",
  cardNumber: 158,
  rarity: "rare",
  cost: 6,
  strength: 5,
  willpower: 4,
  lore: 2,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_39139dbf0feb48b1924d20cc03c58d47",
    tcgPlayer: 485360,
  },
  text: [
    {
      title: "INSIDIOUS PLOT",
      description: "When you play this character, chosen opposing character gets -5 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Villain"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -5,
        stat: "strength",
        target: "CHOSEN_OPPOSING_CHARACTER",
        type: "modify-stat",
      },
      id: "1nb-1",
      name: "INSIDIOUS PLOT",
      text: "INSIDIOUS PLOT When you play this character, chosen opposing character gets -5 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
