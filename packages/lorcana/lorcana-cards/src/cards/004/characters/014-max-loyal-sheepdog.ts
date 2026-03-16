import type { CharacterCard } from "@tcg/lorcana-types";

export const maxLoyalSheepdog: CharacterCard = {
  id: "6A5",
  canonicalId: "ci_6A5",
  reprints: ["set4-014"],
  cardType: "character",
  name: "Max",
  version: "Loyal Sheepdog",
  i18n: {
    en: {
      name: "Max",
      version: "Loyal Sheepdog",
      text: [
        {
          title: "HERE BOY",
          description:
            "If you have a character named Prince Eric in play, you pay 1 {I} less to play this character.",
        },
      ],
    },
    de: {
      name: "Max",
      version: "Loyaler Hirtenhund",
      text: [
        {
          title: "NA, KOMM HER, JUNGE!",
          description:
            "Wenn du einen Prinz-Eric-Charakter im Spiel hast, zahlst du 1 weniger, um diesen Charakter auszuspielen.",
        },
      ],
    },
    fr: {
      name: "Max",
      version: "Chien de berger fidèle",
      text: [
        {
          title: "VIENS, MON CHIEN",
          description:
            "Si vous avez un personnage Prince Eric en jeu, jouer ce personnage coûte 1 de moins.",
        },
      ],
    },
    it: {
      name: "Max",
      version: "Fedele Cane Pastore",
      text: [
        {
          title: "QUI BELLO",
          description:
            "Se hai in gioco un personaggio chiamato Principe Eric, paga 1 in meno per giocare questo personaggio.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Little Mermaid",
  set: "004",
  cardNumber: 14,
  rarity: "common",
  cost: 3,
  strength: 4,
  willpower: 3,
  lore: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_9002164290424cb1911b9817cf1abf95",
    tcgPlayer: 550558,
  },
  text: [
    {
      title: "HERE BOY",
      description:
        "If you have a character named Prince Eric in play, you pay 1 {I} less to play this character.",
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
                equals: "Prince Eric",
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
      id: "1d6-1",
      text: "HERE BOY If you have a character named Prince Eric in play, you pay 1 {I} less to play this character.",
      type: "action",
    },
  ],
};
