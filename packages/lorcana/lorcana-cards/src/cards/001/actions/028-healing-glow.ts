import type { ActionCard } from "@tcg/lorcana-types";

export const healingGlow: ActionCard = {
  id: "S50",
  canonicalId: "ci_S50",
  reprints: ["set1-028"],
  cardType: "action",
  name: "Healing Glow",
  i18n: {
    en: {
      name: "Healing Glow",
      text: "Remove up to 2 damage from chosen character.",
    },
    de: {
      name: "Heilendes Leuchten",
      text: "Entferne bis zu 2 Schaden von einem Charakter deiner Wahl.",
    },
    fr: {
      name: "LUEUR RÉPARATRICE",
      text: "Choisissez un personnage et retirez-lui jusqu'à 2 jetons Dommage.",
    },
    it: {
      name: "Bagliore Curativo",
      text: "Rimuovi fino a 2 danni da un personaggio a tua scelta.",
    },
  },
  inkType: ["amber"],
  franchise: "Tangled",
  set: "001",
  cardNumber: 28,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_ce4f357a6aa24302ba5553eefea4930a",
    tcgPlayer: 492713,
  },
  text: "Remove up to 2 damage from chosen character.",
  abilities: [
    {
      effect: {
        amount: 2,
        target: "CHOSEN_CHARACTER",
        type: "remove-damage",
        upTo: true,
      },
      id: "1ix-1",
      text: "Remove up to 2 damage from chosen character.",
      type: "action",
    },
  ],
};
