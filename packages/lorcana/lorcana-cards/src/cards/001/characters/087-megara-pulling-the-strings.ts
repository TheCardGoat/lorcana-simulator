import type { CharacterCard } from "@tcg/lorcana-types";

export const megaraPullingTheStrings: CharacterCard = {
  id: "M9e",
  canonicalId: "ci_QjA",
  reprints: ["set1-087", "set9-079"],
  cardType: "character",
  name: "Megara",
  version: "Pulling the Strings",
  i18n: {
    en: {
      name: "Megara",
      version: "Pulling the Strings",
      text: [
        {
          title: "WONDER BOY",
          description: "When you play this character, chosen character gets +2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Meg",
      version: "Hält die Fäden in der Hand",
      text: [
        {
          title: "WUNDERKNABE",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug +2.",
        },
      ],
    },
    fr: {
      name: "MÉGARA",
      version: "Tireuse de ficelles",
      text: [
        {
          title: "SUPER-MÂLE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne +2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Megara",
      version: "Pulling the Strings",
      text: [
        {
          title: "WONDER BOY",
          description: "When you play this character, chosen character gets +2 this turn.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 87,
  rarity: "common",
  cost: 2,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_bac12540d0734d2080c8cac9d19265d7",
    tcgPlayer: 650019,
  },
  text: [
    {
      title: "WONDER BOY",
      description: "When you play this character, chosen character gets +2 {S} this turn.",
    },
  ],
  classifications: ["Dreamborn", "Ally"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
      },
      id: "wy2-1",
      name: "WONDER BOY",
      text: "WONDER BOY When you play this character, chosen character gets +2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
