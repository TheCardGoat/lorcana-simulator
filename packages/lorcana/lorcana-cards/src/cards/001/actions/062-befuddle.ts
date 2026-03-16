import type { ActionCard } from "@tcg/lorcana-types";

export const befuddle: ActionCard = {
  id: "q0K",
  canonicalId: "ci_q0K",
  reprints: ["set1-062"],
  cardType: "action",
  name: "Befuddle",
  i18n: {
    en: {
      name: "Befuddle",
      text: "Return a character or item with cost 2 or less to their player's hand.",
    },
    de: {
      name: "Das meistbeirrende Spiel",
      text: "Schicke einen Charakter oder Gegenstand, der 2 oder weniger kostet, auf die zugehörige Hand zurück.",
    },
    fr: {
      name: "EMBERLIFICOTAGE",
      text: "Renvoyez un personnage ou un objet coûtant 2 ou moins dans la main de son propriétaire.",
    },
    it: {
      name: "Befuddle",
      text: "Return chosen character or item with cost 2 or less to their player's hand.",
    },
  },
  inkType: ["amethyst"],
  franchise: "Sword in the Stone",
  set: "001",
  cardNumber: 62,
  rarity: "uncommon",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_6e2faccbf9a240219279b1c4acff7bd5",
    tcgPlayer: 503355,
  },
  text: "Return a character or item with cost 2 or less to their player's hand.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "return-to-hand",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character", "item"],
          filter: [
            {
              type: "cost-comparison",
              comparison: "less-or-equal",
              value: 2,
            },
          ],
        },
      },
    },
  ],
};
