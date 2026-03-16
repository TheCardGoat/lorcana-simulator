import type { CharacterCard } from "@tcg/lorcana-types";

export const zipperFlyingRanger: CharacterCard = {
  id: "ogS",
  canonicalId: "ci_ogS",
  reprints: ["set8-192"],
  cardType: "character",
  name: "Zipper",
  version: "Flying Ranger",
  i18n: {
    en: {
      name: "Zipper",
      version: "Flying Ranger",
      text: [
        {
          title: "BEST MATES",
          description:
            "If you have a character named Monterey Jack in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "BURST OF SPEED",
          description:
            "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
        },
      ],
    },
    de: {
      name: "Summi",
      version: "Fliegender Ritter des Rechts",
      text: [
        {
          title: "BESTE KUMPEL",
          description:
            "Wenn du einen Samson-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
        {
          title: "GESCHWINDIGKEITSSCHUB",
          description:
            "In deinem Zug erhält dieser Charakter Wendig. (Er kann Charaktere mit Wendig herausfordern.)",
        },
      ],
    },
    fr: {
      name: "Ruzor",
      version: "Ranger volant",
      text: [
        {
          title: "MEILLEURS COPAINS",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage Jack le Costaud en jeu.",
        },
        {
          title: "ACCÉLÉRATION",
          description:
            "Durant votre tour, ce personnage gagne Insaisissable. (Il peut défier des personnages avec Insaisissable.)",
        },
      ],
    },
    it: {
      name: "Zipper",
      version: "Agente Speciale Volante",
      text: [
        {
          title: "AMICI DEL CUORE",
          description:
            "Se hai in gioco un personaggio chiamato Monterey Jack, paga 1 in meno per giocare questo personaggio.",
        },
        {
          title: "SCATTO VELOCE",
          description:
            "Durante il tuo turno, questo personaggio ottiene Sfuggente. (Può sfidare altri personaggi con Sfuggente.)",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Rescue Rangers",
  set: "008",
  cardNumber: 192,
  rarity: "uncommon",
  cost: 3,
  strength: 2,
  willpower: 4,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_7a1795d8ea814feb8b1c6bc53a692f78",
    tcgPlayer: 631476,
  },
  text: [
    {
      title: "BEST MATES",
      description:
        "If you have a character named Monterey Jack in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "BURST OF SPEED",
      description:
        "During your turn, this character gains Evasive. (They can challenge characters with Evasive.)",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      effect: {
        condition: {
          type: "target-query",
          query: {
            selector: "all",
            owner: "you",
            zones: ["play"],
            cardType: "character",
            filters: [
              {
                type: "name",
                equals: "Monterey Jack",
              },
            ],
          },
          comparison: {
            operator: "gte",
            value: 1,
          },
        },
        then: {
          from: "hand",
          type: "play-card",
        },
        type: "conditional",
      },
      id: "8ix-1",
      text: "BEST MATES If you have a character named Monterey Jack in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
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
      id: "8ix-2",
      text: "BURST OF SPEED During your turn, this character gains Evasive.",
      type: "static",
    },
  ],
};
