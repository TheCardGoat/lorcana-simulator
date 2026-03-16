import type { ItemCard } from "@tcg/lorcana-types";

export const batteringRam: ItemCard = {
  id: "3pR",
  canonicalId: "ci_3pR",
  reprints: ["set11-101"],
  cardType: "item",
  name: "Battering Ram",
  i18n: {
    en: {
      name: "Battering Ram",
      text: [
        {
          title: "FULL FORCE",
          description: "{E} — Deal 1 damage to chosen damaged character.",
        },
        {
          title: "BREAK THROUGH",
          description: "{E}, Banish this item — Banish chosen location.",
        },
      ],
    },
    de: {
      name: "Rammbock",
      text: [
        {
          title: "VOLLE KRAFT",
          description:
            "— Füge einem beschädigten Charakter deiner Wahl 1 Schaden zu. DURCHBRUCH, Verbanne diesen Gegenstand — Verbanne einen Ort deiner Wahl.",
        },
      ],
    },
    fr: {
      name: "Bélier",
      text: [
        {
          title: "PLEINE PUISSANCE",
          description:
            "— Choisissez un personnage ayant au moins un dommage et infligez-lui 1 dommage. PERCÉE, Bannissez cet objet — Choisissez un lieu et bannissez-le.",
        },
      ],
    },
    it: {
      name: "Ariete d'Assedio",
      text: [
        {
          title: "PIENA POTENZA",
          description:
            "— Infliggi 1 danno a un personaggio danneggiato a tua scelta. FARE BRECCIA, esilia questo oggetto — Esilia un luogo a tua scelta.",
        },
      ],
    },
  },
  inkType: ["emerald"],
  franchise: "Beauty and the Beast",
  set: "011",
  cardNumber: 101,
  rarity: "rare",
  cost: 4,
  inkable: true,
  externalIds: {
    lorcast: "crd_c49a2f008f0048d4951384b30880eba6",
    tcgPlayer: 675394,
  },
  text: [
    {
      title: "FULL FORCE",
      description: "{E} — Deal 1 damage to chosen damaged character.",
    },
    {
      title: "BREAK THROUGH",
      description: "{E}, Banish this item — Banish chosen location.",
    },
  ],
  abilities: [
    {
      id: "1bw-1",
      name: "FULL FORCE",
      type: "activated",
      cost: {
        exert: true,
      },
      effect: {
        type: "deal-damage",
        amount: 1,
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["character"],
          filter: [
            {
              type: "damaged",
            },
          ],
        },
      },
      text: "FULL FORCE {E} — Deal 1 damage to chosen damaged character.",
    },
    {
      id: "1bw-2",
      name: "BREAK THROUGH",
      type: "activated",
      cost: {
        exert: true,
        banishSelf: true,
      },
      effect: {
        type: "banish",
        target: {
          selector: "chosen",
          count: 1,
          owner: "any",
          zones: ["play"],
          cardTypes: ["location"],
        },
      },
      text: "BREAK THROUGH {E}, Banish this item — Banish chosen location.",
    },
  ],
};
