import type { ItemCard } from "@tcg/lorcana-types";

export const croquetMallet: ItemCard = {
  id: "Jp2",
  canonicalId: "ci_Jp2",
  reprints: ["set2-066"],
  cardType: "item",
  name: "Croquet Mallet",
  i18n: {
    en: {
      name: "Croquet Mallet",
      text: [
        {
          title: "HURTLING HEDGEHOG",
          description:
            "Banish this item — Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
    de: {
      name: "Krocketschläger",
      text: [
        {
          title: "RASENDER IGEL",
          description:
            "Verbanne diesen Gegenstand — Ein Charakter deiner Wahl erhält in diesem Zug Rasant. (Der Charakter kann im selben Zug herausfordern, in dem er ausgespielt wird.)",
        },
      ],
    },
    fr: {
      name: "Maillet de croquet",
      text: [
        {
          title: "HÉRISSON VÉLOCE",
          description:
            "Bannissez cet objet — Choisissez un personnage, il gagne Charge pour le reste de ce tour.",
        },
      ],
    },
    it: {
      name: "Croquet Mallet",
      text: [
        {
          title: "HURTLING HEDGEHOG",
          description:
            "Banish this item — Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 66,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_2f8f2276cb254195b2abf5cffd2b8193",
    tcgPlayer: 527741,
  },
  text: [
    {
      title: "HURTLING HEDGEHOG",
      description:
        "Banish this item — Chosen character gains Rush this turn. (They can challenge the turn they're played.)",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        duration: "this-turn",
        keyword: "Rush",
        target: "CHOSEN_CHARACTER",
        type: "gain-keyword",
      },
      id: "1s8-1",
      name: "HURTLING HEDGEHOG",
      text: "HURTLING HEDGEHOG Banish this item — Chosen character gains Rush this turn.",
      type: "activated",
    },
  ],
};
