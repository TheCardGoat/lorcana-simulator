import type { ActionCard } from "@tcg/lorcana-types";

export const smash_set9: ActionCard = {
  id: "vCv",
  canonicalId: "ci_0iV",
  reprints: ["set1-200", "set9-198"],
  cardType: "action",
  name: "Smash",
  i18n: {
    en: {
      name: "Smash",
      text: "Deal 3 damage to chosen character.",
    },
    de: {
      name: "Wuchtschlag",
      text: "Füge einem Charakter deiner Wahl 3 Schaden zu.",
    },
    fr: {
      name: "FRACASSER !",
      text: "Choisissez un personnage et infligez-lui 3 dommages.",
    },
    it: {
      name: "Sfasciare",
      text: "Infliggi 3 danni a un personaggio a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Frozen",
  set: "009",
  cardNumber: 198,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_108a4980fc8d4e3f84faf7b7ffc18cc0",
    tcgPlayer: 650131,
  },
  text: "Deal 3 damage to chosen character.",
  abilities: [
    {
      type: "action",
      effect: {
        amount: 3,
        type: "deal-damage",
        target: "CHOSEN_CHARACTER",
      },
    },
  ],
};
