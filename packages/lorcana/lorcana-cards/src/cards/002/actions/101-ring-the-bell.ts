import type { ActionCard } from "@tcg/lorcana-types";

export const ringTheBell: ActionCard = {
  id: "9sx",
  canonicalId: "ci_9sx",
  reprints: ["set2-101"],
  cardType: "action",
  name: "Ring the Bell",
  i18n: {
    en: {
      name: "Ring the Bell",
      text: "Banish chosen damaged character.",
    },
    de: {
      name: "Läute die Glocke",
      text: "Verbanne einen beschädigten Charakter deiner Wahl.",
    },
    fr: {
      name: "Sonner la clochette",
      text: "Choisissez un personnage blessé et bannissez-le.",
    },
    it: {
      name: "Ring the Bell",
      text: "Banish chosen damaged character.",
    },
  },
  inkType: ["emerald"],
  franchise: "Great Mouse Detective",
  set: "002",
  cardNumber: 101,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_50bb3e4e83fa4e7d9e603a15bc296c3e",
    tcgPlayer: 525266,
  },
  text: "Banish chosen damaged character.",
  abilities: [
    {
      type: "action",
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          filter: [
            {
              type: "damaged",
            },
          ],
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
    },
  ],
};
