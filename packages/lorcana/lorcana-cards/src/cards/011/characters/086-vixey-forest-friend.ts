import type { CharacterCard } from "@tcg/lorcana-types";

export const vixeyForestFriend: CharacterCard = {
  id: "tPQ",
  canonicalId: "ci_tPQ",
  reprints: ["set11-086"],
  cardType: "character",
  name: "Vixey",
  version: "Forest Friend",
  i18n: {
    en: {
      name: "Vixey",
      version: "Forest Friend",
      text: [
        {
          title: "SHOWIN' UP",
          description:
            "If you have a character named Tod in play, you pay 1 {I} less to play this character.",
        },
        {
          title: "Evasive",
        },
      ],
    },
    de: {
      name: "Trixi, die Füchsin",
      version: "Freundin des Waldes",
      text: [
        {
          title: "KOMMST DU?",
          description:
            "Falls du einen Cap-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen. Wendig",
        },
      ],
    },
    fr: {
      name: "Vixy",
      version: "Amie de la forêt",
      text: [
        {
          title: "CELLE QUI T'ATTEND",
          description:
            "Jouer ce personnage vous coûte 1 de moins si vous avez un personnage Rox en jeu. Insaisissable",
        },
      ],
    },
    it: {
      name: "Vicky",
      version: "Amica del Bosco",
      text: [
        {
          title: "FARTI NOTARE",
          description:
            "Se hai in gioco un personaggio chiamato Red, paga 1 meno per giocare questo personaggio. Sfuggente",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Fox and the Hound",
  set: "011",
  cardNumber: 86,
  rarity: "uncommon",
  cost: 3,
  strength: 1,
  willpower: 3,
  lore: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_6edf9f351f6d4d8ea588fbbdbf8ed253",
    tcgPlayer: 676204,
  },
  text: [
    {
      title: "SHOWIN' UP",
      description:
        "If you have a character named Tod in play, you pay 1 {I} less to play this character.",
    },
    {
      title: "Evasive",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "q34-1",
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
                equals: "Tod",
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
      type: "action",
      text: "SHOWIN' UP If you have a character named Tod in play, you pay 1 {I} less to play this character.",
    },
    {
      id: "q34-2",
      keyword: "Evasive",
      type: "keyword",
      text: "Evasive",
    },
  ],
};
