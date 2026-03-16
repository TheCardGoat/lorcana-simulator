import type { CharacterCard } from "@tcg/lorcana-types";

export const starkeyHooksHenchman: CharacterCard = {
  id: "lSG",
  canonicalId: "ci_lSG",
  reprints: ["set1-191"],
  cardType: "character",
  name: "Starkey",
  version: "Hook’s Henchman",
  i18n: {
    en: {
      name: "Starkey",
      version: "Hook’s Henchman",
      text: [
        {
          title: "AYE AYE, CAPTAIN",
          description: "While you have a Captain character in play, this character gets +1.",
        },
      ],
    },
    de: {
      name: "Starkey",
      version: "Hooks Handlanger",
      text: [
        {
          title: "AYE, AYE, KÄPT'N",
          description:
            "Dieser Charakter erhält +1, solange du mindestens eine Kapitänin oder einen Kapitän im Spiel hast.",
        },
      ],
    },
    fr: {
      name: "MONSIEUR STARKEY",
      version: "Acolyte de Crochet",
      text: [
        {
          title: "OUI, CAPITAINE",
          description:
            "Ce personnage a +1 tant que vous avez au moins un personnage Capitaine en jeu.",
        },
      ],
    },
    it: {
      name: "Starkey",
      version: "Hook’s Henchman",
      text: [
        {
          title: "AYE AYE, CAPTAIN",
          description: "While you have a Captain character in play, this character gets +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "001",
  cardNumber: 191,
  rarity: "uncommon",
  cost: 5,
  strength: 5,
  willpower: 4,
  lore: 1,
  inkable: true,
  missingTests: true,
  externalIds: {
    lorcast: "crd_fdbf31b467214b229b4e4f149c487a47",
    tcgPlayer: 508947,
  },
  text: [
    {
      title: "AYE AYE, CAPTAIN",
      description: "While you have a Captain character in play, this character gets +1.",
    },
  ],
  classifications: ["Storyborn", "Ally", "Pirate"],
  abilities: [
    {
      effect: {
        modifier: 1,
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "187-1",
      name: "AYE AYE, CAPTAIN",
      text: "AYE AYE, CAPTAIN While you have a Captain character in play, this character gets +1 {L}.",
      type: "static",
    },
  ],
};
