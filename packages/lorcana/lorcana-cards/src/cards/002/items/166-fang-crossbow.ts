import type { ItemCard } from "@tcg/lorcana-types";

export const fangCrossbow: ItemCard = {
  id: "B1T",
  canonicalId: "ci_B1T",
  reprints: ["set2-166"],
  cardType: "item",
  name: "Fang Crossbow",
  i18n: {
    en: {
      name: "Fang Crossbow",
      text: [
        {
          title: "CAREFUL AIM",
          description: "{E}, 2 {I} — Chosen character gets -2 {S} this turn.",
        },
        {
          title: "STAY BACK!",
        },
        {
          title: "{E},",
          description: "Banish this item — Banish chosen Dragon character.",
        },
      ],
    },
    de: {
      name: "Armbrust aus Zahn",
      text: [
        {
          title: "SORGFÄLTIG ZIELEN",
          description:
            "2, — Gib einem Charakter deiner Wahl in diesem Zug -2. ZURÜCK MIT EUCH!, Verbanne diesen Gegenstand — Verbanne einen Drachen deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Arbalète de Croc du Dragon",
      text: [
        {
          title: "VISÉE PRÉCISE,",
          description:
            "2 — Choisissez un personnage, il subit -2 pour le reste de ce tour. N'APPROCHEZ PAS!, bannissez cet objet — Choisissez un personnage Dragon et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Fang Crossbow",
      text: [
        {
          title: "CAREFUL AIM, 2",
          description:
            "— Chosen character gets -2 this turn. STAY BACK!, Banish this item — Banish chosen Dragon character.",
        },
      ],
    },
  },
  inkType: ["sapphire"],
  franchise: "Raya and the Last Dragon",
  set: "002",
  cardNumber: 166,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_8944266c591440ad9bcb0a6723cf0645",
    tcgPlayer: 520860,
  },
  text: [
    {
      title: "CAREFUL AIM",
      description: "{E}, 2 {I} — Chosen character gets -2 {S} this turn.",
    },
    {
      title: "STAY BACK!",
    },
    {
      title: "{E},",
      description: "Banish this item — Banish chosen Dragon character.",
    },
  ],
  abilities: [
    {
      cost: {
        exert: true,
        ink: 2,
      },
      effect: {
        duration: "this-turn",
        modifier: -2,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
        type: "modify-stat",
      },
      id: "1e2-1",
      name: "CAREFUL AIM",
      text: "CAREFUL AIM {E}, 2 {I} — Chosen character gets -2 {S} this turn.",
      type: "activated",
    },
    {
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          filter: [
            {
              classification: "Dragon",
              type: "has-classification",
            },
          ],
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      id: "1e2-2",
      name: "STAY BACK!",
      text: "STAY BACK! {E}, Banish this item — Banish chosen Dragon character.",
      type: "activated",
    },
  ],
};
