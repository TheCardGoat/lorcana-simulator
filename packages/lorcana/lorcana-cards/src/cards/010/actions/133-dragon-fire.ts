import type { ActionCard } from "@tcg/lorcana-types";

export const dragonFire: ActionCard = {
  id: "C8T",
  canonicalId: "ci_Jpc",
  reprints: ["set1-130", "set10-133"],
  cardType: "action",
  name: "Dragon Fire",
  i18n: {
    en: {
      name: "Dragon Fire",
      text: "Banish chosen character.",
    },
    de: {
      name: "Dragon Fire",
      text: "Banish chosen character.",
    },
    fr: {
      name: "Dragon Fire",
      text: "Banish chosen character.",
    },
    it: {
      name: "Dragon Fire",
      text: "Banish chosen character.",
    },
  },
  inkType: ["ruby"],
  franchise: "Sleeping Beauty",
  set: "010",
  cardNumber: 133,
  rarity: "common",
  cost: 5,
  inkable: false,
  externalIds: {
    lorcast: "crd_c5d9b54870104360b88dfd59bbb28af5",
    tcgPlayer: 659245,
  },
  text: "Banish chosen character.",
  abilities: [
    {
      effect: {
        target: {
          cardTypes: ["character"],
          count: 1,
          owner: "any",
          selector: "chosen",
          zones: ["play"],
        },
        type: "banish",
      },
      type: "action",
    },
  ],
};
