import type { CharacterCard } from "@tcg/lorcana-types";

export const merlinBackFromBermuda: CharacterCard = {
  id: "gdk",
  canonicalId: "ci_gdk",
  reprints: ["set5-142"],
  cardType: "character",
  name: "Merlin",
  version: "Back from Bermuda",
  i18n: {
    en: {
      name: "Merlin",
      version: "Back from Bermuda",
      text: [
        {
          title: "LONG LIVE THE KING!",
          description: "Your characters named Arthur gain Resist +1.",
        },
      ],
    },
    de: {
      name: "Merlin",
      version: "Zurück von den Bermudas",
      text: [
        {
          title: "LANG LEBE DER KÖNIG!",
          description:
            "Deine Arthur-Charaktere erhalten Robust +1 (Reduziere jeglichen Schaden, der ihnen zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "Merlin",
      version: "De retour de Saint-Trop'",
      text: [
        {
          title: "VIVE LE ROI ARTHUR!",
          description: "Vos personnages Arthur gagnent Résistance +1.",
        },
      ],
    },
    it: {
      name: "Merlino",
      version: "Tornato da Honolulu",
      text: [
        {
          title: "EVVIVA IL RE!",
        },
        {
          title: "I",
          description: "tuoi personaggi chiamati Artù ottengono Resistere +1.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Sword in the Stone",
  set: "005",
  cardNumber: 142,
  rarity: "common",
  cost: 4,
  strength: 1,
  willpower: 4,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_0a76a477c4d142439e5005d76bc01da2",
    tcgPlayer: 561966,
  },
  text: [
    {
      title: "LONG LIVE THE KING!",
      description: "Your characters named Arthur gain Resist +1.",
    },
  ],
  classifications: ["Storyborn", "Mentor", "Sorcerer"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "YOUR_CHARACTERS",
        type: "gain-keyword",
        value: 1,
      },
      id: "eka-1",
      text: "LONG LIVE THE KING! Your characters named Arthur gain Resist +1.",
      type: "action",
    },
  ],
};
