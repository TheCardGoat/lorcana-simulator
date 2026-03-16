import type { CharacterCard } from "@tcg/lorcana-types";

export const maidMarianDelightfulDreamer: CharacterCard = {
  id: "q9a",
  canonicalId: "ci_31G",
  reprints: ["set3-150", "set9-158"],
  cardType: "character",
  name: "Maid Marian",
  version: "Delightful Dreamer",
  i18n: {
    en: {
      name: "Maid Marian",
      version: "Delightful Dreamer",
      text: [
        {
          title: "HIGHBORN LADY",
          description: "When you play this character, chosen character gets -2 {S} this turn.",
        },
      ],
    },
    de: {
      name: "Maid Marian",
      version: "Entzückende Träumerin",
      text: [
        {
          title: "VORNEHME UND ADLIGE DAME",
          description:
            "Wenn du diesen Charakter ausspielst, gib einem Charakter deiner Wahl in diesem Zug -2.",
        },
      ],
    },
    fr: {
      name: "Belle Marianne",
      version: "Charmante rêveuse",
      text: [
        {
          title: "DEMOISELLE DE HAUTE LIGNÉE",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui subit -2 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Lady Marian",
      version: "Incantevole Sognatrice",
      text: [
        {
          title: "NOBILE DAMA",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta riceve -2 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Robin Hood",
  set: "003",
  cardNumber: 150,
  rarity: "common",
  cost: 5,
  strength: 4,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_73c0d376411b4b588a9de5cc5644e4bb",
    tcgPlayer: 650093,
  },
  text: [
    {
      title: "HIGHBORN LADY",
      description: "When you play this character, chosen character gets -2 {S} this turn.",
    },
  ],
  classifications: ["Storyborn", "Princess"],
  missingTests: true,
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: -2,
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
      id: "1p6-1",
      name: "HIGHBORN LADY",
      text: "HIGHBORN LADY When you play this character, chosen character gets -2 {S} this turn.",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
    },
  ],
};
