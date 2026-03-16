import type { CharacterCard } from "@tcg/lorcana-types";

export const patchIntimidatingPup: CharacterCard = {
  id: "530",
  canonicalId: "ci_530",
  reprints: ["set3-014"],
  cardType: "character",
  name: "Patch",
  version: "Intimidating Pup",
  i18n: {
    en: {
      name: "Patch",
      version: "Intimidating Pup",
      text: [
        {
          title: "BARK",
          description: "{E} — Chosen character gets -2 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Patch",
      version: "Einschüchternder Welpe",
      text: [
        {
          title: "BELLEN",
          description: "— Gib einem Charakter deiner Wahl bis zu Beginn deines nächsten Zuges -2.",
        },
      ],
    },
    fr: {
      name: "Patch",
      version: "Chiot intimidant",
      text: [
        {
          title: "ABOIEMENT",
          description:
            "— Choisissez un personnage qui subit -2 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Macchia",
      version: "Piccolo Minaccioso",
      text: [
        {
          title: "ABBAIARE",
          description:
            "— Un personaggio a tua scelta riceve -2 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "101 Dalmatians",
  set: "003",
  cardNumber: 14,
  rarity: "common",
  cost: 4,
  strength: 3,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_d087e066b0484bf9aed46a182f60f0ff",
    tcgPlayer: 539066,
  },
  text: [
    {
      title: "BARK",
      description: "{E} — Chosen character gets -2 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Puppy"],
  missingTests: true,
  abilities: [
    {
      cost: {
        exert: true,
      },
      effect: {
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
      id: "1p9-1",
      text: "BARK {E} — Chosen character gets -2 {S} until the start of your next turn.",
      type: "activated",
    },
  ],
};
