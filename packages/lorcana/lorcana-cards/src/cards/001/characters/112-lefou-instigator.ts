import type { CharacterCard } from "@tcg/lorcana-types";

export const lefouInstigator: CharacterCard = {
  id: "S44",
  canonicalId: "ci_KDb",
  reprints: ["set1-112", "set9-103"],
  cardType: "character",
  name: "LeFou",
  version: "Instigator",
  i18n: {
    en: {
      name: "LeFou",
      version: "Instigator",
      text: [
        {
          title: "FAN THE FLAMES",
          description:
            "When you play this character, ready chosen character. They can't quest for the rest of this turn.",
        },
      ],
    },
    de: {
      name: "Le Fou",
      version: "Anstifter",
      text: [
        {
          title: "ENTFACHT DAS FEUER!",
          description:
            "Wenn du diesen Charakter ausspielst, mache einen Charakter deiner Wahl bereit. Er kann in diesem Zug nicht mehr erkunden.",
        },
      ],
    },
    fr: {
      name: "LE FOU",
      version: "Agitateur de foule",
      text: [
        {
          title: "ATTISER LES FLAMMES",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage et redressez-le. Celui-ci ne peut pas être envoyé à l'aventure pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "LeFou",
      version: "Instigator",
      text: [
        {
          title: "FAN THE FLAMES",
          description:
            "When you play this character, ready chosen character. They can't quest for the rest of this turn.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Beauty and the Beast",
  set: "001",
  cardNumber: 112,
  rarity: "rare",
  cost: 2,
  strength: 2,
  willpower: 2,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_f3852a9841064672acd078eb9d2220a1",
    tcgPlayer: 650041,
  },
  text: [
    {
      title: "FAN THE FLAMES",
      description:
        "When you play this character, ready chosen character. They can't quest for the rest of this turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        steps: [
          {
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["character"],
            },
            type: "ready",
          },
          {
            duration: "this-turn",
            restriction: "cant-quest",
            target: "SELF",
            type: "restriction",
          },
        ],
        type: "sequence",
      },
      id: "kll-1",
      name: "FAN THE FLAMES",
      text: "FAN THE FLAMES When you play this character, ready chosen character. They can't quest for the rest of this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
