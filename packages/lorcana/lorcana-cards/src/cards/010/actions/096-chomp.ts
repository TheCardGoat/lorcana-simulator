import type { ActionCard } from "@tcg/lorcana-types";

export const chomp: ActionCard = {
  id: "vgW",
  canonicalId: "ci_vgW",
  reprints: ["set10-096"],
  cardType: "action",
  name: "Chomp!",
  i18n: {
    en: {
      name: "Chomp!",
      text: "Deal 2 damage to chosen damaged character.",
    },
    de: {
      name: "Mampfen!",
      text: "Füge einem beschädigten Charakter deiner Wahl 2 Schaden zu.",
    },
    fr: {
      name: "Croque !",
      text: "Choisissez un personnage ayant au moins un dommage et infligez-lui 2 dommages.",
    },
    it: {
      name: "Gnam!",
      text: "Infliggi 2 danni a un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  set: "010",
  cardNumber: 96,
  rarity: "common",
  cost: 1,
  inkable: true,
  externalIds: {
    lorcast: "crd_1b74cd74b69f4a369ce0a8af4cb21e10",
    tcgPlayer: 659187,
  },
  text: "Deal 2 damage to chosen damaged character.",
  abilities: [
    {
      effect: {
        amount: 2,
        target: "CHOSEN_DAMAGED_CHARACTER",
        type: "deal-damage",
      },
      type: "action",
    },
  ],
};
