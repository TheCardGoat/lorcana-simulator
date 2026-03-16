import type { ActionCard } from "@tcg/lorcana-types";

export const makeThePotion: ActionCard = {
  id: "gbt",
  canonicalId: "ci_SBd",
  reprints: ["set4-094", "set9-098"],
  cardType: "action",
  name: "Make the Potion",
  i18n: {
    en: {
      name: "Make the Potion",
      text: "Choose one: • Banish chosen item. • Deal 2 damage to chosen damaged character.",
    },
    de: {
      name: "Den Trank brauen",
      text: "Wähle eine Möglickeit aus: • Verbanne einen Gegenstand deiner Wahl. • Füge einem beschädigten Charakter deiner Wahl 2 Schaden zu.",
    },
    fr: {
      name: "Concocter la Potion",
      text: "Choisissez entre: • Choisissez un objet et bannissez-le. • Choisissez un personnage ayant au moins un jeton Dommage et infligez-lui 2 dommages.",
    },
    it: {
      name: "Fare la Pozione",
      text: "Scegli uno: • Esilia un oggetto a tua scelta. • Infliggi 2 danni a un personaggio danneggiato a tua scelta.",
    },
  },
  inkType: ["emerald"],
  franchise: "Snow White",
  set: "009",
  cardNumber: 98,
  rarity: "common",
  cost: 2,
  inkable: false,
  externalIds: {
    lorcast: "crd_5ecd4f8d0e8f44f8bda2b3986c6da49a",
    tcgPlayer: 650036,
  },
  text: "Choose one: • Banish chosen item. • Deal 2 damage to chosen damaged character.",
  abilities: [
    {
      type: "action",
      effect: {
        type: "choice",
        options: [
          {
            type: "banish",
            target: {
              selector: "chosen",
              count: 1,
              owner: "any",
              zones: ["play"],
              cardTypes: ["item"],
            },
          },
          {
            type: "deal-damage",
            amount: 2,
            target: "CHOSEN_DAMAGED_CHARACTER",
          },
        ],
      },
    },
  ],
};
