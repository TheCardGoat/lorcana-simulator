import type { CharacterCard } from "@tcg/lorcana-types";

export const belleBookworm: CharacterCard = {
  id: "cql",
  canonicalId: "ci_cql",
  reprints: ["set2-071"],
  cardType: "character",
  name: "Belle",
  version: "Bookworm",
  i18n: {
    en: {
      name: "Belle",
      version: "Bookworm",
      text: [
        {
          title: "USE YOUR IMAGINATION",
          description: "While an opponent has no cards in their hand, this character gets +2 {L}.",
        },
      ],
    },
    de: {
      name: "Belle",
      version: "Bücherwurm",
      text: [
        {
          title: "MANCH EINER GEBRAUCHT SEINE FANTASIE",
          description:
            "Solange mindestens eine gegnerische Person keine Handkarten hat, erhält dieser Charakter +2.",
        },
      ],
    },
    fr: {
      name: "Belle",
      version: "Rat de bibliothèque",
      text: [
        {
          title: "UTILISEZ VOTRE IMAGINATION",
          description: "Tant qu'un adversaire n'a plus de cartes en main, ce personnage gagne +2.",
        },
      ],
    },
    it: {
      name: "Belle",
      version: "Bookworm",
      text: [
        {
          title: "USE YOUR IMAGINATION",
          description: "While an opponent has no cards in their hand, this character gets +2.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "002",
  cardNumber: 71,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_1379d064484a4269bc01c74fd935c221",
    tcgPlayer: 525246,
  },
  text: [
    {
      title: "USE YOUR IMAGINATION",
      description: "While an opponent has no cards in their hand, this character gets +2 {L}.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      id: "1rv-1",
      name: "USE YOUR IMAGINATION",
      text: "USE YOUR IMAGINATION While an opponent has no cards in their hand, this character gets +2 {L}.",
      type: "static",
      condition: {
        type: "resource-count",
        what: "cards-in-hand",
        controller: "opponent",
        comparison: "equal",
        value: 0,
      },
      effect: {
        modifier: 2,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
    },
  ],
};
