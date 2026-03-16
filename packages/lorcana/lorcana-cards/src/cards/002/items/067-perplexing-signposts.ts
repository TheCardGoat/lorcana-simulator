import type { ItemCard } from "@tcg/lorcana-types";

export const perplexingSignposts: ItemCard = {
  id: "xK3",
  canonicalId: "ci_xK3",
  reprints: ["set2-067"],
  cardType: "item",
  name: "Perplexing Signposts",
  i18n: {
    en: {
      name: "Perplexing Signposts",
      text: [
        {
          title: "TO WONDERLAND",
          description: "Banish this item — Return chosen character of yours to your hand.",
        },
      ],
    },
    de: {
      name: "Wirre Wegweiser",
      text: [
        {
          title: "INS WUNDERLAND",
          description:
            "Verbanne diesen Gegenstand — Wähle einen deiner Charaktere und nimm ihn zurück auf deine Hand.",
        },
      ],
    },
    fr: {
      name: "Panneaux déroutants",
      text: [
        {
          title: "DIRECTION LE PAYS DES MERVEILLES",
          description:
            "Bannissez cet objet — Choisissez l'un de vos personnages en jeu et renvoyez-le dans votre main.",
        },
      ],
    },
    it: {
      name: "Perplexing Signposts",
      text: [
        {
          title: "TO WONDERLAND",
          description: "Banish this item — Return chosen character of yours to your hand.",
        },
      ],
    },
  },
  inkType: ["amethyst"],
  franchise: "Alice in Wonderland",
  set: "002",
  cardNumber: 67,
  rarity: "rare",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_0d0630d4e335471e9a11643b9b82ffcd",
    tcgPlayer: 525153,
  },
  text: [
    {
      title: "TO WONDERLAND",
      description: "Banish this item — Return chosen character of yours to your hand.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        target: "CHOSEN_CHARACTER_OF_YOURS",
        type: "return-to-hand",
      },
      id: "nv1-1",
      name: "TO WONDERLAND",
      text: "TO WONDERLAND Banish this item — Return chosen character of yours to your hand.",
      type: "activated",
    },
  ],
};
