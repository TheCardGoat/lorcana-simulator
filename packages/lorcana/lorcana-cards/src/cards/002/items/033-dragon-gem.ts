import type { ItemCard } from "@tcg/lorcana-types";

export const dragonGem: ItemCard = {
  id: "1DR",
  canonicalId: "ci_1DR",
  reprints: ["set2-033"],
  cardType: "item",
  name: "Dragon Gem",
  i18n: {
    en: {
      name: "Dragon Gem",
      text: [
        {
          title: "BRING BACK TO LIFE",
          description:
            "{E}, 3 {I} — Return a character card with Support from your discard to your hand.",
        },
      ],
    },
    de: {
      name: "Drachenjuwel",
      text: [
        {
          title: "WIEDERBELEBEN, 3",
          description:
            "— Nimm eine Charakterkarte mit der Fähigkeit Unterstützen aus deinem Ablagestapel zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Pierre de Dragon",
      text: [
        {
          title: "RAMENER",
          description:
            "À LA VIE, 3 — Reprenez en main un personnage avec Soutien de votre défausse.",
        },
      ],
    },
    it: {
      name: "Dragon Gem",
      text: [
        {
          title: "BRING BACK TO LIFE, 3",
          description: "— Return a character card with Support from your discard to your hand.",
        },
      ],
    },
  },
  inkType: ["amber"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 33,
  rarity: "rare",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_9d869b2d59da48ad81923dc474ab2bfc",
    tcgPlayer: 526346,
  },
  text: [
    {
      title: "BRING BACK TO LIFE",
      description:
        "{E}, 3 {I} — Return a character card with Support from your discard to your hand.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 3,
      },
      effect: {
        cardType: "character",
        filter: {
          type: "has-keyword",
          keyword: "Support",
        },
        target: "CONTROLLER",
        type: "return-from-discard",
      },
      id: "1oa-1",
      name: "BRING BACK TO LIFE",
      text: "BRING BACK TO LIFE {E}, 3 {I} — Return a character card with Support from your discard to your hand.",
      type: "activated",
    },
  ],
};
