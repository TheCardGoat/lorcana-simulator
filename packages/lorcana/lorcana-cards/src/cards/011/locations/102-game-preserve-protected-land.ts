import type { LocationCard } from "@tcg/lorcana-types";

export const gamePreserveProtectedLand: LocationCard = {
  id: "NKo",
  canonicalId: "ci_NKo",
  reprints: ["set11-102"],
  cardType: "location",
  name: "Game Preserve",
  version: "Protected Land",
  i18n: {
    en: {
      name: "Game Preserve",
      version: "Protected Land",
      text: [
        {
          title: "EASY TO MISS",
          description:
            "While there's a character with Evasive here, this location gains Evasive. (Only characters with Evasive can challenge it.)",
        },
      ],
    },
    de: {
      name: "Wildschutzgebiet",
      version: "Geschütztes Land",
      text: [
        {
          title: "LEICHT ZU ÜBERSEHEN",
          description:
            "Solange du mindestens einen Charakter mit Wendig an diesem Ort hast, erhält dieser Ort Wendig. (Nur Charaktere mit Wendig können ihn herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Réserve de chasse",
      version: "Terrain protégé",
      text: [
        {
          title: "FACILE À RATER",
          description:
            "Tant qu'il y a un personnage avec Insaisissable sur ce lieu, ce lieu gagne Insaisissable. (Seuls les personnages avec Insaisissable peuvent défier ce lieu.)",
        },
      ],
    },
    it: {
      name: "Riserva di Caccia",
      version: "Territorio Protetto",
      text: [
        {
          title: "FACILE NON ACCORGERSENE",
          description:
            "Mentre c'è un personaggio con Sfuggente in questo luogo, questo luogo ottiene Sfuggente. (Solo personaggi con Sfuggente possono sfidarlo.)",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 102,
  rarity: "common",
  cost: 3,
  willpower: 4,
  moveCost: 1,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_f25d2634d58b4a00ab2ac2f2753b8116",
    tcgPlayer: 677135,
  },
  text: [
    {
      title: "EASY TO MISS",
      description:
        "While there's a character with Evasive here, this location gains Evasive. (Only characters with Evasive can challenge it.)",
    },
  ],
  abilities: [
    {
      id: "fh4-1",
      condition: {
        type: "target-query",
        query: {
          selector: "all",
          count: "all",
          owner: "any",
          zones: ["play"],
          cardType: "character",
          filters: [
            {
              type: "same-location-as-source",
            },
            {
              type: "has-keyword",
              keyword: "Evasive",
            },
          ],
        },
        comparison: {
          operator: "gte",
          value: 1,
        },
      },
      effect: {
        keyword: "Evasive",
        target: "SELF",
        type: "gain-keyword",
      },
      type: "static",
      text: "EASY TO MISS While there's a character with Evasive here, this location gains Evasive.",
    },
  ],
};
