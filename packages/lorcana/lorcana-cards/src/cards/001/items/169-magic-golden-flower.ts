import type { ItemCard } from "@tcg/lorcana-types";

export const magicGoldenFlower: ItemCard = {
  id: "evQ",
  canonicalId: "ci_evQ",
  reprints: ["set1-169"],
  cardType: "item",
  name: "Magic Golden Flower",
  i18n: {
    en: {
      name: "Magic Golden Flower",
      text: [
        {
          title: "HEALING POLLEN",
          description: "Banish this item — Remove up to 3 damage from chosen character.",
        },
      ],
    },
    de: {
      name: "Magische Goldene Blume",
      text: [
        {
          title: "HEILENDER",
          description:
            "BLÜTENSTAUB Verbanne diesen Gegenstand — entferne bis zu 3 Schaden von einem Charakter deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "FLEUR AUX PÉTALES D'OR",
      text: [
        {
          title: "POLLEN",
          description:
            "GUÉRISSEUR Bannissez cet objet — Choisissez un personnage et retirez-lui jusqu'à 3 jetons Dommage.",
        },
      ],
    },
    it: {
      name: "Magic Golden Flower",
      text: [
        {
          title: "HEALING POLLEN",
          description: "Banish this item — Remove up to 3 damage from chosen character.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 169,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_33a1cfa2557e48ba8b7aac42a10592f6",
    tcgPlayer: 508860,
  },
  text: [
    {
      title: "HEALING POLLEN",
      description: "Banish this item — Remove up to 3 damage from chosen character.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        amount: 3,
        target: "CHOSEN_CHARACTER",
        type: "remove-damage",
        upTo: true,
      },
      id: "1dk-1",
      name: "HEALING POLLEN",
      text: "HEALING POLLEN Banish this item — Remove up to 3 damage from chosen character.",
      type: "activated",
    },
  ],
};
