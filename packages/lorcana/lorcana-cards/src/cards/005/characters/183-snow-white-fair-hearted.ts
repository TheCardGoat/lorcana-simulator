import type { CharacterCard } from "@tcg/lorcana-types";

export const snowWhiteFairhearted: CharacterCard = {
  id: "45E",
  canonicalId: "ci_Z93",
  reprints: ["set5-183"],
  cardType: "character",
  name: "Snow White",
  version: "Fair-Hearted",
  i18n: {
    en: {
      name: "Snow White",
      version: "Fair-Hearted",
      text: [
        {
          title: "NATURAL LEADER",
          description:
            "This character gains Resist +1 for each other Knight character you have in play.",
        },
      ],
    },
    de: {
      name: "Schneewittchen",
      version: "Ein gutes Herz",
      text: [
        {
          title: "SELBSTVERSTÄNDLICHE ANFÜHRERIN",
          description:
            "Dieser Charakter erhält Robust +1 für jeden anderen Ritter, den du im Spiel hast. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1 pro anderen Ritter.)",
        },
      ],
    },
    fr: {
      name: "Blanche-Neige",
      version: "Cœur juste",
      text: [
        {
          title: "MENEUSE-NÉE",
          description:
            "Ce personnage gagne Résistance +1 pour chaque autre personnage Chevalier que vous avez en jeu. (Les dommages qui lui sont infligés sont réduits de 1 pour chaque autre Chevalier.)",
        },
      ],
    },
    it: {
      name: "Biancaneve",
      version: "Giusta di Cuore",
      text: [
        {
          title: "LEADER NATA",
          description:
            "Questo personaggio ottiene Resistere +1 per ogni altro personaggio Cavaliere che hai in gioco.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 183,
  rarity: "common",
  cost: 5,
  strength: 3,
  willpower: 5,
  lore: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_222e3894d8c04d2899b047a97912b5c6",
    tcgPlayer: 562007,
  },
  text: [
    {
      title: "NATURAL LEADER",
      description:
        "This character gains Resist +1 for each other Knight character you have in play.",
    },
  ],
  classifications: ["Dreamborn", "Hero", "Princess", "Knight"],
  abilities: [
    {
      effect: {
        keyword: "Resist",
        target: "SELF",
        type: "gain-keyword",
        value: 1,
      },
      id: "1ie-1",
      text: "NATURAL LEADER This character gains Resist +1 for each other Knight character you have in play.",
      type: "static",
    },
  ],
};
