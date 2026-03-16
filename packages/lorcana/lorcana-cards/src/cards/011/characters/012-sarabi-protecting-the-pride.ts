import type { CharacterCard } from "@tcg/lorcana-types";

export const sarabiProtectingThePride: CharacterCard = {
  id: "EYo",
  canonicalId: "ci_EYo",
  reprints: ["set11-012"],
  cardType: "character",
  name: "Sarabi",
  version: "Protecting the Pride",
  i18n: {
    en: {
      name: "Sarabi",
      version: "Protecting the Pride",
      text: [
        {
          title: "FEARSOME SNARL",
          description:
            "{E} — Chosen opposing character gets -4 {S} until the start of your next turn.",
        },
      ],
    },
    de: {
      name: "Sarabi",
      version: "Schützt das Rudel",
      text: [
        {
          title: "FURCHTERREGENDES KNURREN",
          description:
            "— Ein gegnerischer Charakter deiner Wahl erhält bis zu Beginn deines nächsten Zuges -4.",
        },
      ],
    },
    fr: {
      name: "Sarabi",
      version: "Protégeant la troupe",
      text: [
        {
          title: "GROGNEMENT EFFRAYANT",
          description:
            "— Choisissez un personnage adverse qui subit -4 jusqu'au début de votre prochain tour.",
        },
      ],
    },
    it: {
      name: "Sarabi",
      version: "Protettrice del Branco",
      text: [
        {
          title: "RINGHIO SPAVENTOSO",
          description:
            "— Un personaggio avversario a tua scelta riceve -4 fino all'inizio del tuo prossimo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Lion King",
  set: "011",
  cardNumber: 12,
  rarity: "common",
  cost: 4,
  strength: 4,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7820a5ea1cc44b97b4b5aeb89fc1882a",
    tcgPlayer: 676187,
  },
  text: [
    {
      title: "FEARSOME SNARL",
      description: "{E} — Chosen opposing character gets -4 {S} until the start of your next turn.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Queen"],
  abilities: [
    {
      id: "m08-1",
      effect: {
        modifier: -4,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      type: "action",
      text: "FEARSOME SNARL {E} - Chosen opposing character gets -4 {S} until the start of your next turn.",
    },
  ],
};
