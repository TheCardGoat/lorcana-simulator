import type { CharacterCard } from "@tcg/lorcana-types";

export const happyLivelyKnight: CharacterCard = {
  id: "qmH",
  canonicalId: "ci_qmH",
  reprints: ["set5-191"],
  cardType: "character",
  name: "Happy",
  version: "Lively Knight",
  i18n: {
    en: {
      name: "Happy",
      version: "Lively Knight",
      text: [
        {
          title: "BURST OF SPEED",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Happy",
      version: "Ritter der Lebensfreude",
      text: [
        {
          title: "GESCHWINDIGKEITSSCHUB",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Joyeux",
      version: "Chevalier guilleret",
      text: [
        {
          title: "RAPIDE COMME L'ÉCLAIR",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Gongolo",
      version: "Cavaliere Allegro",
      text: [
        {
          title: "SCATTO VELOCE",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Snow White",
  set: "005",
  cardNumber: 191,
  rarity: "common",
  cost: 1,
  strength: 2,
  willpower: 1,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_fa38166d51fb479a962761c3c17a670d",
    tcgPlayer: 559665,
  },
  text: [
    {
      title: "BURST OF SPEED",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Dreamborn", "Ally", "Knight", "Seven Dwarfs"],
  abilities: [
    {
      condition: {
        type: "turn",
        whose: "your",
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      id: "g6u-1",
      text: "BURST OF SPEED During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
