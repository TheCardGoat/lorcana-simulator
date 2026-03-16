import type { ActionCard } from "@tcg/lorcana-types";

export const hotPotato: ActionCard = {
  id: "7Fa",
  canonicalId: "ci_7Fa",
  reprints: ["set6-195"],
  cardType: "action",
  name: "Hot Potato",
  i18n: {
    en: {
      name: "Hot Potato",
      text: "Choose one:\n- Deal 2 damage to chosen character.\n- Banish chosen item.",
    },
    de: {
      name: "Heiss und Fettig",
      text: "Wähle eine Möglichkeit aus: • Füge einem Charakter deiner Wahl 2 Schaden zu. • Verbanne einen Gegenstand deiner Wahl.",
    },
    fr: {
      name: "Patate chaude",
      text: "Choisissez entre: • Choisissez un personnage et infligez-lui 2 dommages. • Choisissez un objet et bannissez-le.",
    },
    it: {
      name: "Patata Bollente",
      text: "Scegli uno: • Infliggi 2 danni a un personaggio a tua scelta. • Esilia un oggetto a tua scelta.",
    },
  },
  inkType: ["steel"],
  franchise: "Lilo and Stitch",
  set: "006",
  cardNumber: 195,
  rarity: "uncommon",
  cost: 3,
  inkable: true,
  externalIds: {
    lorcast: "crd_ab3a202cb90a43beac5943ac4baad67a",
    tcgPlayer: 578234,
  },
  text: "Choose one:\n- Deal 2 damage to chosen character.\n- Banish chosen item.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "deal-damage",
            amount: 2,
            target: "CHOSEN_CHARACTER",
          },
          {
            type: "banish",
            target: "CHOSEN_ITEM",
          },
        ],
      },
    },
  ],
};
