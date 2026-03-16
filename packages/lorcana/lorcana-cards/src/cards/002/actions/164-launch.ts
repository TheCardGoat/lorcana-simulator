import type { ActionCard } from "@tcg/lorcana-types";

export const launch: ActionCard = {
  id: "Ysg",
  canonicalId: "ci_Ysg",
  reprints: ["set2-164"],
  cardType: "action",
  name: "Launch",
  i18n: {
    en: {
      name: "Launch",
      text: "Banish chosen item of yours to deal 5 damage to chosen character.",
    },
    de: {
      name: "Abschuss",
      text: "Verbanne einen deiner Gegenstände, um einem Charakter deiner Wahl 5 Schaden zuzufügen.",
    },
    fr: {
      name: "Projectile de fortune",
      text: "Choisissez l'un de vos objets et bannissez-le pour infliger 5 dommages à un personnage au choix.",
    },
    it: {
      name: "Launch",
      text: "Banish chosen item of yours to deal 5 damage to chosen character.",
    },
  },
  inkType: ["sapphire"],
  franchise: "Lorcana",
  set: "002",
  cardNumber: 164,
  rarity: "uncommon",
  cost: 3,
  inkable: false,
  externalIds: {
    lorcast: "crd_93883c73ea3d4c269ed099da7f77414b",
    tcgPlayer: 527624,
  },
  text: "Banish chosen item of yours to deal 5 damage to chosen character.",
  abilities: [
    {
      effect: {
        type: "sequence",
        steps: [
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "you",
              zones: ["play"],
              cardTypes: ["item"],
            },
          },
          {
            type: "conditional",
            condition: {
              type: "if-you-do",
            },
            then: {
              amount: 5,
              target: {
                cardTypes: ["character"],
                count: 1,
                owner: "any",
                selector: "chosen",
                zones: ["play"],
              },
              type: "deal-damage",
            },
          },
        ],
      },
      type: "action",
    },
  ],
};
