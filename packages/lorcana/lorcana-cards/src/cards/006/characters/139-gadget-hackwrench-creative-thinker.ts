import type { CharacterCard } from "@tcg/lorcana-types";

export const gadgetHackwrenchCreativeThinker: CharacterCard = {
  id: "Khj",
  canonicalId: "ci_Khj",
  reprints: ["set6-139"],
  cardType: "character",
  name: "Gadget Hackwrench",
  version: "Creative Thinker",
  i18n: {
    en: {
      name: "Gadget Hackwrench",
      version: "Creative Thinker",
      text: [
        {
          title: "BRAINSTORM",
          description: "Whenever you play an item, this character gets +1 {L} this turn.",
        },
      ],
    },
    de: {
      name: "Trixi",
      version: "Kreativer Kopf",
      text: [
        {
          title: "GEISTESBLITZ",
          description:
            "Jedes Mal, wenn du einen Gegenstand ausspielst, erhält dieser Charakter in diesem Zug +1.",
        },
      ],
    },
    fr: {
      name: "Gadget",
      version: "Esprit créatif",
      text: [
        {
          title: "REMUE-MÉNINGES",
          description:
            "Chaque fois que vous jouez un objet, ce personnage gagne +1 pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Scheggia Hackwrench",
      version: "Pensatrice Creativa",
      text: [
        {
          title: "SCERVELLARSI",
          description:
            "Ogni volta che giochi un oggetto, questo personaggio riceve +1 per questo turno.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Rescue Rangers",
  set: "006",
  cardNumber: 139,
  rarity: "common",
  cost: 3,
  strength: 1,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_64b2156407ef4b99a1636bf189825eaa",
    tcgPlayer: 588152,
  },
  text: [
    {
      title: "BRAINSTORM",
      description: "Whenever you play an item, this character gets +1 {L} this turn.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Inventor"],
  abilities: [
    {
      effect: {
        duration: "this-turn",
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1w4-1",
      name: "BRAINSTORM",
      text: "BRAINSTORM Whenever you play an item, this character gets +1 {L} this turn.",
      trigger: {
        event: "play",
        on: {
          cardType: "item",
          controller: "you",
        },
        timing: "whenever",
      },
      type: "triggered",
    },
  ],
};
