import type { CharacterCard } from "@tcg/lorcana-types";

export const pocahontasFindingTheWay: CharacterCard = {
  id: "3Q8",
  canonicalId: "ci_3Q8",
  reprints: ["set11-008"],
  cardType: "character",
  name: "Pocahontas",
  version: "Finding the Way",
  i18n: {
    en: {
      name: "Pocahontas",
      version: "Finding the Way",
      text: [
        {
          title: "DISCOVERY AWAITS",
          description: "When you play this character, chosen character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Pocahontas",
      version: "Findet den Weg",
      text: [
        {
          title: "DIE ENTDECKUNG WARTET",
          description:
            "Wenn du diesen Charakter ausspielst, erhält ein Charakter deiner Wahl in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Pocahontas",
      version: "Trouve le bon chemin",
      text: [
        {
          title: "DES DÉCOUVERTES NOUS ATTENDENT",
          description:
            "Lorsque vous jouez ce personnage, choisissez un personnage qui gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Pocahontas",
      version: "Che Trova la Via",
      text: [
        {
          title: "LA SCOPERTA CI ATTENDE",
          description:
            "Quando giochi questo personaggio, un personaggio a tua scelta riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Pocahontas",
  set: "011",
  cardNumber: 8,
  rarity: "common",
  cost: 3,
  strength: 2,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_aa9b3ea05aa64ee9aa09783eb6ca425c",
    tcgPlayer: 674822,
  },
  text: [
    {
      title: "DISCOVERY AWAITS",
      description: "When you play this character, chosen character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Hero", "Princess"],
  abilities: [
    {
      id: "hen-1",
      effect: {
        modifier: 1,
        stat: "lore",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "modify-stat",
        duration: "this-turn",
      },
      name: "DISCOVERY AWAITS",
      trigger: {
        event: "play",
        on: "SELF",
        timing: "when",
      },
      type: "triggered",
      text: "DISCOVERY AWAITS When you play this character, chosen character gets +1 {L} this turn.",
    },
  ],
};
