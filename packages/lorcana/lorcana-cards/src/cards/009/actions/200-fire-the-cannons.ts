import type { ActionCard } from "@tcg/lorcana-types";

export const fireTheCannons: ActionCard = {
  id: "K4W",
  canonicalId: "ci_Ots",
  reprints: ["set1-197", "set9-200"],
  cardType: "action",
  name: "Fire the Cannons!",
  i18n: {
    en: {
      name: "Fire the Cannons!",
      text: "Deal 2 damage to chosen character.",
    },
    de: {
      name: "Feuert die Kanonen!",
      text: "Füge einem Charakter deiner Wahl 2 Schaden zu.",
    },
    fr: {
      name: "ALLUMEZ LES MÊCHES !",
      text: "Choisissez un personnage et infligez-lui 2 dommages.",
    },
    it: {
      name: "Fire the Cannons!",
      text: "Deal 2 damage to chosen character.",
    },
  },
  inkType: ["steel"],
  franchise: "Peter Pan",
  set: "009",
  cardNumber: 200,
  rarity: "common",
  cost: 1,
  inkable: false,
  externalIds: {
    lorcast: "crd_5056d5a4da8e4d9bb329620e1e77329b",
    tcgPlayer: 650133,
  },
  text: "Deal 2 damage to chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "deal-damage",
        amount: 2,
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
