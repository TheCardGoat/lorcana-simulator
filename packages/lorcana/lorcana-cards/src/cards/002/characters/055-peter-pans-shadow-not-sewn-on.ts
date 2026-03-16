import type { CharacterCard } from "@tcg/lorcana-types";

export const peterPansShadowNotSewnOn: CharacterCard = {
  id: "qvr",
  canonicalId: "ci_5eN",
  reprints: ["set2-055", "set9-042"],
  cardType: "character",
  name: "Peter Pan's Shadow",
  version: "Not Sewn On",
  i18n: {
    en: {
      name: "Peter Pan's Shadow",
      version: "Not Sewn On",
      text: [
        {
          title: "Evasive",
        },
        {
          title: "Rush",
        },
        {
          title: "TIPTOE",
          description: "Your other characters with Rush gain Evasive.",
        },
      ],
    },
    de: {
      name: "Peter Pans Schatten",
      version: "Nicht angenäht",
      text: "Wendig Rasant AUF ZEHENSPITZEN Deine anderen Charaktere mit Rasant erhalten Wendig.",
    },
    fr: {
      name: "Ombre de Peter Pan",
      version: "Décousue",
      text: "Insaisissable Charge SUR LA POINTE DES PIEDS Vos autres personnages avec Charge gagnent Insaisissable.",
    },
    it: {
      name: "Peter Pan's Shadow",
      version: "Not Sewn On",
      text: [
        {
          title: "Evasive",
          description:
            "(Only characters with Evasive can challenge this character.) Rush (This character can challenge the turn they're played.) TIPTOE Your other characters with Rush gain Evasive.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Peter Pan",
  set: "002",
  cardNumber: 55,
  rarity: "common",
  cost: 4,
  strength: 2,
  willpower: 3,
  lore: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_929d3fa7c5324a1dbc9ebc1d93bbee6d",
    tcgPlayer: 649989,
  },
  text: [
    {
      title: "Evasive",
    },
    {
      title: "Rush",
    },
    {
      title: "TIPTOE",
      description: "Your other characters with Rush gain Evasive.",
    },
  ],
  classifications: ["Storyborn", "Ally"],
  abilities: [
    {
      id: "1n6-1",
      keyword: "Rush",
      text: "Rush",
      type: "keyword",
    },
    {
      id: "1n6-2",
      keyword: "Evasive",
      text: "Evasive",
      type: "keyword",
    },
    {
      id: "1n6-3",
      name: "TIPTOE",
      text: "TIPTOE Your other characters with Rush gain Evasive.",
      type: "static",
      effect: {
        keyword: "Evasive",
        target: {
          cardTypes: ["character"],
          count: "all",
          excludeSelf: true,
          owner: "you",
          selector: "all",
          zones: ["play"],
          filter: [
            {
              type: "has-keyword",
              keyword: "Rush",
            },
          ],
        },
        type: "gain-keyword",
      },
    },
  ],
};
