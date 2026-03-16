import type { CharacterCard } from "@tcg/lorcana-types";

export const missBiancaUnwaveringAgent: CharacterCard = {
  id: "Knt",
  canonicalId: "ci_Knt",
  reprints: ["set7-195"],
  cardType: "character",
  name: "Miss Bianca",
  version: "Unwavering Agent",
  i18n: {
    en: {
      name: "Miss Bianca",
      version: "Unwavering Agent",
      text: [
        {
          title: "HAVE A LITTLE FAITH",
          description:
            "If you have an Ally character in play, you pay 2 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Miss Bianca",
      version: "Unermüdliche Agentin",
      text: [
        {
          title: "WENN WIR ZUVERSICHTLICH SIND",
          description:
            "Wenn du mindestens einen Verbündeten im Spiel hast, zahlst du 2 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Miss Bianca",
      version: "Agente indéfectible",
      text: [
        {
          title: "GARDONS ESPOIR",
          description:
            "Jouer ce personnage vous coûte 2 de moins si vous avez un personnage Allié en jeu.",
        },
      ],
    },
    it: {
      name: "Miss Bianca",
      version: "Agente Risoluta",
      text: [
        {
          title: "SE ABBIAMO UN PO' DI FEDE",
          description:
            "Se hai in gioco un personaggio Alleato, paga 2 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["steel"],
  franchise: "Rescuers",
  set: "007",
  cardNumber: 195,
  rarity: "common",
  cost: 6,
  strength: 5,
  willpower: 5,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_977124ea617d440a9224e0eb1619ded6",
    tcgPlayer: 619520,
  },
  text: [
    {
      title: "HAVE A LITTLE FAITH",
      description:
        "If you have an Ally character in play, you pay 2 {I} less to play this character.",
    },
  ],
  classifications: ["Dreamborn", "Hero"],
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
                type: "has-classification",
                classification: "Ally",
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
      id: "jeo-1",
      text: "HAVE A LITTLE FAITH If you have an Ally character in play, you pay 2 {I} less to play this character.",
      type: "action",
    },
  ],
};
