import type { CharacterCard } from "@tcg/lorcana-types";

export const johnSilverGreedyTreasureSeeker: CharacterCard = {
  id: "5zh",
  canonicalId: "ci_8IC",
  reprints: ["set3-176", "set9-192"],
  cardType: "character",
  name: "John Silver",
  version: "Greedy Treasure Seeker",
  i18n: {
    en: {
      name: "John Silver",
      version: "Greedy Treasure Seeker",
      text: [
        {
          title: "CHART YOUR OWN COURSE",
          description:
            "For each location you have in play, this character gains Resist +1 and gets +1 {L}.",
        },
      ],
    },
    de: {
      name: "John Silver",
      version: "Habgieriger Schatzsucher",
      text: [
        {
          title: "DEINEN KURS BESTIMMEN",
          description:
            "Für jeden Ort den du im Spiel hast, erhält dieser Charakter +1 und Robust +1. (Reduziere jeglichen Schaden, der diesem Charakter zugefügt wird, um 1.)",
        },
      ],
    },
    fr: {
      name: "John Silver",
      version: "Chasseur de trésor avide",
      text: [
        {
          title: "CHOISIS TOI-MÊME TON CAP",
          description:
            "Ce personnage gagne +1 et Résistance +1 pour chaque lieu que vous avez en jeu.",
        },
      ],
    },
    it: {
      name: "John Silver",
      version: "Avido Cacciatore di Tesori",
      text: [
        {
          title: "TRACCIARE LA TUA ROTTA",
          description:
            "Per ogni luogo che hai in gioco, questo personaggio ottiene Resistere +1 e riceve +1.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 176,
  rarity: "rare",
  cost: 3,
  strength: 3,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_8db5f81d06034612b857a11fc606c5d2",
    tcgPlayer: 650125,
  },
  text: [
    {
      title: "CHART YOUR OWN COURSE",
      description:
        "For each location you have in play, this character gains Resist +1 and gets +1 {L}.",
    },
  ],
  classifications: ["Dreamborn", "Villain", "Alien", "Pirate", "Captain"],
  missingImplementation: true,
  missingTests: true,
  abilities: [
    {
      effect: {
        steps: [
          {
            keyword: "Resist",
            target: "SELF",
            type: "gain-keyword",
            value: 1,
          },
          {
            modifier: 1,
            stat: "lore",
            target: "CHOSEN_CHARACTER",
            type: "modify-stat",
          },
        ],
        type: "sequence",
      },
      id: "jy5-1",
      text: "CHART YOUR OWN COURSE For each location you have in play, this character gains Resist +1 and gets +1 {L}.",
      type: "action",
    },
  ],
};
