import type { ActionCard } from "@tcg/lorcana-types";

export const baboom: ActionCard = {
  id: "GSJ",
  canonicalId: "ci_GSJ",
  reprints: ["set3-196"],
  cardType: "action",
  name: "Ba-Boom!",
  i18n: {
    en: {
      name: "Ba-Boom!",
      text: "Deal 2 damage to chosen character or location.",
    },
    de: {
      name: "Baa-Bumm!",
      text: "Füge einem Charakter oder Ort deiner Wahl 2 Schaden zu.",
    },
    fr: {
      name: "Ba-boum !",
      text: "Choisissez un personnage ou un lieu et infligez-lui 2 dommages.",
    },
    it: {
      name: "Ba-Bum!",
      text: "Infliggi 2 danni a un personaggio o a un luogo a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Treasure Planet",
  set: "003",
  cardNumber: 196,
  rarity: "common",
  cost: 2,
  inkable: true,
  externalIds: {
    lorcast: "crd_8355f42d81564fc288c8e67b0f04628c",
    tcgPlayer: 537636,
  },
  text: "Deal 2 damage to chosen character or location.",
  abilities: [
    {
      effect: {
        amount: 2,
        target: "CHOSEN_CHARACTER_OR_LOCATION",
        type: "deal-damage",
      },
      type: "action",
    },
  ],
};
