import type { CharacterCard } from "@tcg/lorcana-types";

export const hadesKingOfOlympus: CharacterCard = {
  id: "XhN",
  canonicalId: "ci_pZ2",
  reprints: ["set1-005"],
  cardType: "character",
  name: "Hades",
  version: "King of Olympus",
  i18n: {
    en: {
      name: "Hades",
      version: "King of Olympus",
      text: [
        {
          title: "Shift 6",
        },
        {
          title: "SINISTER PLOT",
          description:
            "This character gets +1 {L} for each other Villain character you have in play.",
        },
      ],
    },
    de: {
      name: "Hades",
      version: "König des Olymps",
      text: "Gestaltwandel 6 FINSTERE VERSCHWÖRUNG Dieser Charakter erhält +1 für jede weitere Schurkin und jeden weiteren Schurken, die du im Spiel hast.",
    },
    fr: {
      name: "HADES",
      version: "Roi de l'Olympe",
      text: "Alter 6 SINISTRE COMPLOT Ce personnage a + 1 pour chaque autre personnage Méchant que vous avez en jeu.",
    },
    it: {
      name: "Hades",
      version: "King of Olympus",
      text: [
        {
          title: "Shift 6",
          description:
            "(You may pay 6 to play this on top of one of your characters named Hades.) SINISTER PLOT This character gets +1 for each other Villain character you have in play.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Hercules",
  set: "001",
  cardNumber: 5,
  rarity: "rare",
  cost: 8,
  strength: 6,
  willpower: 7,
  lore: 1,
  inkable: false,
  missingTests: true,
  externalIds: {
    lorcast: "crd_a9c86e6316084d76a03b32be95977091",
    tcgPlayer: 510148,
  },
  text: [
    {
      title: "Shift 6",
    },
    {
      title: "SINISTER PLOT",
      description: "This character gets +1 {L} for each other Villain character you have in play.",
    },
  ],
  classifications: ["Floodborn", "Villain", "King", "Deity"],
  abilities: [
    {
      cost: {
        ink: 6,
      },
      id: "1e5-1",
      keyword: "Shift",
      text: "Shift 6",
      type: "keyword",
    },
    {
      effect: {
        modifier: {
          classification: "Villain",
          controller: "you",
          type: "classification-character-count",
        },
        stat: "lore",
        target: "SELF",
        type: "modify-stat",
      },
      id: "1e5-2",
      name: "SINISTER PLOT",
      text: "SINISTER PLOT This character gets +1 {L} for each other Villain character you have in play.",
      type: "static",
    },
  ],
};
