import type { ItemCard } from "@tcg/lorcana-types";

export const whiteRabbitsPocketWatch: ItemCard = {
  id: "yLh",
  canonicalId: "ci_lFD",
  reprints: ["set1-068", "set9-066"],
  cardType: "item",
  name: "White Rabbit’s Pocket Watch",
  i18n: {
    en: {
      name: "White Rabbit’s Pocket Watch",
      text: [
        {
          title: "I'M LATE!, 1",
          description:
            "— Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Taschenuhr des weißen Kaninchens",
      text: [
        {
          title: "ZU",
          description:
            "SPÄT!, 1 — Ein Charakter deiner Wahl erhält in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "MONTRE À GOUSSET",
      text: [
        {
          title: "EN RETARD!, 1",
          description:
            "— Choisissez un personnage, il gagne Charge pour le reste de ce tour. (Il peut défier le tour où il est joué.)",
        },
      ],
    },
    it: {
      name: "White Rabbit’s Pocket Watch",
      text: [
        {
          title: "I'M LATE!, 1",
          description:
            "— Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "009",
  cardNumber: 66,
  rarity: "rare",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_d483668415d54d07861f290ceebc0c38",
    tcgPlayer: 650009,
  },
  text: [
    {
      title: "I'M LATE!, 1",
      description:
        "— Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 1,
      },
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "gain-keyword",
      },
      id: "ecf-1",
      name: "I'M LATE!",
      text: "I'M LATE! {E}, 1 {I} — Chosen character gains Rush this turn.",
      type: "activated",
    },
  ],
};
