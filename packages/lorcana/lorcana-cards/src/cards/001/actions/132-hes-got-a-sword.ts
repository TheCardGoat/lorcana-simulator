import type { ActionCard } from "@tcg/lorcana-types";

export const hesGotASword: ActionCard = {
  id: "CpS",
  canonicalId: "ci_CpS",
  reprints: ["set1-132"],
  cardType: "action",
  name: "He's Got a Sword!",
  i18n: {
    en: {
      name: "He's Got a Sword!",
      text: "Chosen character gets +2 {S} this turn.",
    },
    de: {
      name: "Er hat ein Schwert!",
      text: "Gib einem Charakter deiner Wahl in diesem Zug +2.",
    },
    fr: {
      name: "IL A UN SABRE !",
      text: "Choisissez un personnage, il gagne +2 pour le reste de ce tour.",
    },
    it: {
      name: "Ha una Spada!",
      text: "Un personaggio a tua scelta riceve +2 per questo turno.",
    },
  },
  inkType: ["ruby"],
  franchise: "Aladdin",
  set: "001",
  cardNumber: 132,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_3f328e2a6ea741bcb31348ee2954b3e8",
    tcgPlayer: 508782,
  },
  text: "Chosen character gets +2 {S} this turn.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "modify-stat",
        duration: "this-turn",
        modifier: 2,
        stat: "strength",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
