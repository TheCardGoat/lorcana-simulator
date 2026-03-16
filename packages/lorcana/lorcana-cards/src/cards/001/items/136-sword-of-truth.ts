import type { ItemCard } from "@tcg/lorcana-types";

export const swordOfTruth: ItemCard = {
  id: "4Du",
  canonicalId: "ci_4Du",
  reprints: ["set1-136"],
  cardType: "item",
  name: "Sword of Truth",
  i18n: {
    en: {
      name: "Sword of Truth",
      text: [
        {
          title: "FINAL ENCHANTMENT",
          description: "Banish this item — Banish chosen Villain character.",
        },
      ],
    },
    de: {
      name: "Schwert der Wahrheit",
      text: [
        {
          title: "LETZTER ZAUBER",
          description:
            "Verbanne diesen Gegenstand — verbanne eine Schurkin oder einen Schurken deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "ÉPÉE DE VÉRITÉ",
      text: [
        {
          title: "ENCHANTEMENT FINAL",
          description: "Bannissez cet objet — Choisissez un personnage Méchant et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Sword of Truth",
      text: [
        {
          title: "FINAL ENCHANTMENT",
          description: "Banish this item — Banish chosen Villain character.",
        },
      ],
    },
  },
  inkType: ["ruby"],
  franchise: "Sleeping Beauty",
  set: "001",
  cardNumber: 136,
  rarity: "rare",
  cost: 4,
  inkable: false,
  externalIds: {
    lorcast: "crd_19c135ff62f2427d93b3131114b4c10b",
    tcgPlayer: 508793,
  },
  text: [
    {
      title: "FINAL ENCHANTMENT",
      description: "Banish this item — Banish chosen Villain character.",
    },
  ],
  abilities: [
    {
      cost: {
        banishSelf: true,
      },
      effect: {
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "has-classification",
              classification: "Villain",
            },
          ],
        },
        type: "banish",
      },
      id: "1mo-1",
      name: "FINAL ENCHANTMENT",
      text: "FINAL ENCHANTMENT Banish this item — Banish chosen Villain character.",
      type: "activated",
    },
  ],
};
