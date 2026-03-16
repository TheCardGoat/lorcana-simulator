import type { ActionCard } from "@tcg/lorcana-types";

export const outOfOrder: ActionCard = {
  id: "ljS",
  canonicalId: "ci_ljS",
  reprints: ["set7-148"],
  cardType: "action",
  name: "Out of Order",
  i18n: {
    en: {
      name: "Out of Order",
      text: "Banish chosen character.",
    },
    de: {
      name: "Ausser Betrieb",
      text: "Verbanne einen Charakter deiner Wahl.",
    },
    fr: {
      name: "Hors service",
      text: "Choisissez un personnage et bannissez-le.",
    },
    it: {
      name: "Fuori Servizio",
      text: "Esilia un personaggio a tua scelta.",
    },
  },
  inkType: ["ruby"],
  franchise: "Wreck It Ralph",
  set: "007",
  cardNumber: 148,
  rarity: "common",
  cost: 7,
  inkable: true,
  externalIds: {
    lorcast: "crd_0b939927deb64ca8a8ddde773f6cc340",
    tcgPlayer: 619491,
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
      id: "155-1",
      text: "Banish chosen character.",
      type: "action",
    },
  ],
};
